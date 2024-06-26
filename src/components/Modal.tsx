import React from 'react'
import { useNavigate } from 'react-router-dom'
import googleLogo from "../assets/google.svg"
import microsoftLogo from "../assets/microsoft.png"
import { EModalShowing } from "../types.ts"
import { ThemeContext } from '../ThemeContex.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { apiUrl } from "../url.ts"
import Notification from './Notification.tsx'

interface IModalProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    valueShowing: EModalShowing
    setValueShowing: React.Dispatch<React.SetStateAction<EModalShowing>>
}
interface ISignUpOrgForm {
    companyName: string,
    contactPersonName: string,
    email: string,
    phoneNumber: string,
    location: string,
    password: string
}
interface IHandleFormChange {
    (field: string, value: any): void
}
interface ISigninForm {
    email: string,
    password: string
}


const Modal: React.FC<IModalProps> = function ({ isOpen, setIsOpen, valueShowing, setValueShowing }) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState(false)
    const [notificationMessage, setNotificationMessage] = React.useState("");
    const [isNotificationShowing, setIsNotificationShowing] = React.useState(false)
    const signUpOrgFormData: ISignUpOrgForm = {
        companyName: "",
        contactPersonName: "",
        email: '',
        location: "",
        phoneNumber: "",
        password: ""
    }
    const adminSigninData: ISigninForm = {
        email: "",
        password: ""
    }
    const staffSigninData: ISigninForm = {
        email: "",
        password: ""
    }
    const [signUpOrgFormState, setSignUpOrgFormState] = React.useState(signUpOrgFormData)
    const [adminLoginFormState, setAdminLoginFormState] = React.useState(adminSigninData)
    const [staffLoginFormState, setStaffLoginFormState] = React.useState(staffSigninData)
    const [passwordCriteria, setPasswordCriteria] = React.useState({
        hasEightCharacters: false,
        hasOneUpperCase: false,
        hasOneNumber: false,
        hasOneSpecialCharacter: false
    });

    const handleButtonClick = (message: string) => {
        setIsNotificationShowing(true);
        setNotificationMessage(message)
        setTimeout(() => {
            setIsNotificationShowing(false);
        }, 3000);
    }

    const checkPasswordStrong = (password: string) => {
        const criteria = {
            hasEightCharacters: password.length >= 8,
            hasOneUpperCase: /[A-Z]/.test(password),
            hasOneNumber: /\d/.test(password),
            hasOneSpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        setPasswordCriteria(criteria);
    };


    const calculatePasswordStrength = () => {
        const criteriaMet = Object.values(passwordCriteria).filter(value => value).length;
        return (criteriaMet / 4) * 100;
    };


    const handleCompanyOrgDataChange: IHandleFormChange = function (field, value) {
        const newData = {
            ...signUpOrgFormState,
            [field]: value
        }
        setSignUpOrgFormState(newData)
    }


    const handleAdminDataChange: IHandleFormChange = function (field, value) {
        const newData = {
            ...adminLoginFormState,
            [field]: value
        }
        setAdminLoginFormState(newData)
    }


    const handleStaffDataChange: IHandleFormChange = function (field, value) {
        const newData = {
            ...staffLoginFormState,
            [field]: value
        }
        setStaffLoginFormState(newData)
    }
    const handleSignUpOrgSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            setIsLoading(true)
            const response = await axios.post(`${apiUrl}/organization/create`, signUpOrgFormState)
            console.log(signUpOrgFormState)
            localStorage.setItem('token', JSON.stringify(response.data.token))
            localStorage.setItem('role', "sub-admin")
            setIsLoading(false)
		alert("Go back and sign in as sub admin")
	    setIsOpen(!isOpen)
            //navigate('/sub/admin')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsLoading(false)
                handleButtonClick(`${error?.response?.data?.message}`)
                console.log(error)
            }
        }
    }


    const handleSubAdminLogin = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            setIsLoading(true)
            const response = await axios.post(`${apiUrl}/subadmin/login`, adminLoginFormState)
            console.log(response.data)
            localStorage.setItem('token', JSON.stringify(response.data.token))
            localStorage.setItem('role', "sub-admin")
            localStorage.setItem('orgId', JSON.stringify(response.data.organizationId))
            setIsLoading(false)
            navigate('/sub/admin')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsLoading(false)
                console.log(error)
                if (error?.response?.data.message) handleButtonClick(`${error?.response?.data?.message}`)
                else handleButtonClick(`${error.message}`)
                console.log(error)
            }
        }
    }

    const handleStaffLogin = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            setIsLoading(true)
            const response = await axios.post(`${apiUrl}/staff/login`, staffLoginFormState)
            localStorage.setItem('token', JSON.stringify(response.data.token))
            localStorage.setItem('role', "staff")
            localStorage.setItem('orgId', JSON.stringify(response.data.organizationId))
            localStorage.setItem('staffId', JSON.stringify(response.data.staffId))
            setIsLoading(false)
            navigate('/staff')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsLoading(false)
                console.log(error)
                if (error?.response?.data.message) handleButtonClick(`${error?.response?.data?.message}`)
                else handleButtonClick(`${error.message}`)
                console.log(error)
            }
        }
    }

    const { darkMode } = React.useContext(ThemeContext);
    const handleCloseModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            setIsOpen(false);
        }
    };

    let formToShow: React.ReactElement | undefined = undefined;

    const signUpOrgForm = <form action="" className={`loginForm ${darkMode && "dark"}`} onSubmit={(e) => handleSignUpOrgSubmit(e)}>
        <h2 className={`font-bold ${darkMode ? "text-gray-100" : "text-[#4f4f4f]"} text-3 text-lg py-3`}>Create Account</h2>
        <p className={`text-sm my-3 ${darkMode && "text-white"}`}>Optimize your device performance with our device health management system, Sign up now and never miss a beat.</p>
        <label>
            <span>Company Name</span>
            <input required type="text" placeholder='Enter Company Name' value={signUpOrgFormState.companyName} onChange={(e) => handleCompanyOrgDataChange("companyName", e.target.value)} />
        </label>
        <label>
            <span>Company Email</span>
            <input required type="email" placeholder='Enter Company Email' value={signUpOrgFormState.email} onChange={(e) => handleCompanyOrgDataChange("email", e.target.value)} />
        </label>
        <label>
            <span>Company IT Manager</span>
            <input required type="text" placeholder='Enter IT Manager name' value={signUpOrgFormState.contactPersonName} onChange={(e) => handleCompanyOrgDataChange("contactPersonName", e.target.value)} />
        </label>
        <label>
            <span>Company Address</span>
            <input required type="text" placeholder='Enter Company Address' value={signUpOrgFormState.location} onChange={(e) => handleCompanyOrgDataChange("location", e.target.value)} />
        </label>
        <label>
            <span>Company Phone Number</span>
            <input required type="text" placeholder='Enter Company Phone Number' value={signUpOrgFormState.phoneNumber} onChange={(e) => handleCompanyOrgDataChange("phoneNumber", e.target.value)} />
        </label>
        <label>
            <span>Password</span>
            <input required type="password" placeholder='Enter a password' value={signUpOrgFormState.password} onChange={(e) => { handleCompanyOrgDataChange("password", e.target.value); checkPasswordStrong(e.target.value) }} />
        </label>

        <p className='px-3'>Your Password Must contain a minimum of</p>
        <div className='passwordChecks p-3 '>
            <label className={`${passwordCriteria.hasEightCharacters && "line-through"}`}><input disabled type="checkbox" name="passwordCheck" value="hasEightCharacters" checked={passwordCriteria.hasEightCharacters} />  <label></label> <span>Eight Characters</span></label>
            <label className={`${passwordCriteria.hasOneUpperCase && "line-through"}`}><input disabled type="checkbox" name="passwordCheck" value="hasOneUpperCase" checked={passwordCriteria.hasOneUpperCase} /> <label></label>  <span>One UPPERCASE Letter</span></label>
            <label className={`${passwordCriteria.hasOneNumber && "line-through"}`}><input disabled type="checkbox" name="passwordCheck" value="hasOneNumber" checked={passwordCriteria.hasOneNumber} /> <label></label>  <span>One Number, and</span></label>
            <label className={`${passwordCriteria.hasOneSpecialCharacter && "line-through"}`}><input disabled type="checkbox" name="passwordCheck" value="hasOneSpecialCharacter" checked={passwordCriteria.hasOneSpecialCharacter} /> <label></label>  <span>One Special Character (e.g !”@#%^&?)</span></label>

            <span>Your Password is {calculatePasswordStrength()}% Strong</span>
        </div>
        <button className={`bg-blue-600 p-3 text-white w-[90%] my-3 rounded-md ${isLoading && "bg-gray-500 text-black"}`} disabled={isLoading}>{isLoading ? "Loading..." : "Sign Up"}</button>

        <div className='flex flex-col justify-center items-center w-full gap-2 my-6'>
            <span>Or Sign Up with</span>
            <img src={googleLogo} alt="Google Logo" className='w-[4rem] h-auto transform -translate-y-2' />
            <span className='cursor-pointer' onClick={() => { setValueShowing(EModalShowing.second) }}>Have an account already? <span className='text-blue-600 font-bold'>Sign In</span> </span>
        </div>
    </form>

    const adminLoginForm = <form action="" className={`loginForm ${darkMode && "dark"}`} onSubmit={(e) => handleSubAdminLogin(e)}>
        <h2 className={`font-bold ${darkMode ? "text-gray-100" : "text-[#4f4f4f]"} text-3 text-lg py-3`}>Welcome Back</h2>
        <p className={`text-sm my-3 ${darkMode && "text-white"}`}>Please log into your account</p>
        <label>
            <span>Email Address</span>
            <input required type="email" placeholder='Enter Email Address' value={adminLoginFormState.email} onChange={(e) => handleAdminDataChange("email", e.target.value)} />
        </label>
        <label>
            <span>Password</span>
            <input required type="password" placeholder='Enter Your Password' value={adminLoginFormState.password} onChange={(e) => handleAdminDataChange("password", e.target.value)} />
        </label>
        <div className='flex justify-between items-center px-2'>
            <label><input type="checkbox" name='remember' value="true" /> <span>Remember me</span></label>
            <span className='text-blue-600 font-bold text-md pr-[2.5rem] cursor-pointer'>Forgot Password</span>
        </div>
        <button className={`bg-blue-600 p-3 text-white w-[90%] my-3 rounded-md ${isLoading && "bg-gray-500 text-black"}`} disabled={isLoading}>{isLoading ? "Loading..." : "Sign In"}</button>

        <div className='flex flex-col justify-center items-center w-full gap-2 my-6'>
            <span>Or Sign Up with</span>
            <img src={googleLogo} alt="Google Logo" className='w-[4rem] h-auto transform -translate-y-2' />
            <span className='cursor-pointer' onClick={() => { setValueShowing(EModalShowing.first) }}>Don't have an account yet? <span className='text-blue-600 font-bold'>Sign Up</span> </span>
        </div>
    </form>

    const staffLoginForm = <form action="" className={`loginForm ${darkMode && "dark"}`} onSubmit={(e) => handleStaffLogin(e)}>
        <h2 className={`font-bold ${darkMode ? "text-gray-100" : "text-[#4f4f4f]"} text-3 text-lg py-3`}>Welcome to the Staff Login Portal!</h2>
        <p className={`text-sm my-3 ${darkMode && "text-white"}`}>Enter your registered email and StaffID to access your account. If you don't know your registered details, contact your company's IT Admin for assistance.</p>
        <label>
            <span>Email Address</span>
            <input required type="email" placeholder='Enter Email Address' value={staffLoginFormState.email} onChange={(e) => handleStaffDataChange("email", e.target.value)} />
        </label>
        <label>
            <span>Password</span>
            <input required type="password" placeholder='Enter Your Password' value={staffLoginFormState.password} onChange={(e) => handleStaffDataChange("password", e.target.value)} />
        </label>
        <div className='flex justify-between items-center px-2'>
            <label><input type="checkbox" name='remember' value="true" /> <span>Remember me</span></label>

        </div>
        <button className={`bg-blue-600 p-3 text-white w-[90%] my-3 rounded-md ${isLoading && "bg-gray-500 text-black"}`} disabled={isLoading}>{isLoading ? "Loading..." : "Sign In"}</button>

        <div className='flex flex-col justify-center items-center w-full gap-2 my-6'>
            <span>Or Log in with</span>
            <img src={microsoftLogo} alt="Microsoft Logo" className='w-[10rem] h-auto transform -translate-y-2' />
        </div>

    </form>

    valueShowing === 0 ? formToShow = signUpOrgForm : valueShowing === 1 ? formToShow = adminLoginForm : valueShowing === 2 ? formToShow = staffLoginForm : formToShow = undefined

    return (
        <>
            <Notification message={notificationMessage} isShowing={isNotificationShowing} error={true}/>

            <div className={`fixed top-0 left-0 w-[100%] h-[100vh] bg-black bg-opacity-50 zIndex-3 flex items-center justify-center ${!isOpen && "hidden"}`} onClick={handleCloseModal}>
                <div className={`w-[70%] md:w-[45%] h-[90%] ${darkMode ? "bg-gray-900 text-white" : "bg-white"} p-5 rounded-md`}>
                    <div onClick={() => setIsOpen(false)} className='text-right p-2 cursor-pointer'> <FontAwesomeIcon icon={faClose} /> &nbsp;Close</div>

                    <div className='overflow-y-scroll h-[90%] flex flex-col items-center align-center w-full'>
                        {formToShow ? formToShow : "<div></div>"}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
