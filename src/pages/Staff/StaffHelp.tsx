import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const StaffHelp:React.FC = () => {
  const [activeFaqIndex, setActiveFaqIndex] = React.useState<number>(0);

  const handleFaqClick = (index: number) => {
    setActiveFaqIndex(index === activeFaqIndex ? -1 : index); // Toggle open/close
  };

	return (
	<>
{/* Header */}
      <header className="bg-blue-950 shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-white">Help and Support</h1>
        </div>
      </header>

    <div className="container mx-auto px-8 py-8">
	

      {/* Search Bar */}
      <div className="mb-4 flex items-center justify-start gap-1 bg-gray-100 p-3 rounded-md">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full rounded-md bg-transparent px-4 py-2 focus:outline-none"
        />
      </div>

      {/* FAQs */}
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-2">Frequently Asked Questions</h2>
        <div>
          {['How do i add a new device?', 'Does my company cover my personal devices?', /* Add more FAQ questions here */].map(
            (question, index) => (
              <div key={question} className="mb-4">
                <button
                  className={`w-full text-left font-medium text-gray-700 bg-gray-100 rounded px-4 py-2 hover:bg-gray-200 focus:outline-none ${
                    activeFaqIndex === index ? 'border-b border-blue-500' : ''
                  }`}
                  type="button"
                  onClick={() => handleFaqClick(index)}
                >
                  {question} {activeFaqIndex !== index ? <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-gray-400" />: <FontAwesomeIcon icon={faChevronUp} className="ml-2 text-gray-400" />}
                </button>
                {activeFaqIndex === index && (
                  <div className="p-4 text-gray-600 pl-8">
                    <p>
                      {index === 0 && (
                        <span>
                          You will have to contact your organization's IT department to assign a new device to you
                        </span>
                      )}
                      {index === 1 && (
                        <span>
                          No, ITSA only covers company devices.
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Knowledge Base */}
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-2">Knowledge Materials</h2>
        <ul className="list-disc space-y-2">
          <li>
            <a
              href="#"
              className="text-blue-500 hover:underline hover:text-blue-700"
            >
              How to create a new organizational account
            </a>
          </li>
          {/* Add more knowledge base items here... */}
        </ul>
      </div>

      {/* Contact Information */}
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-2">Contact Support</h2>
        <p className="mb-2">
          If you can't find the answer to your question in the FAQs or
          knowledge base, please contact ITSA support.
        </p>
        <ul className="list-disc space-y-2">
          <li>
            <span className="font-medium">Phone:</span> <a href="tel: +2349011871245" target='_blank'>+2349011871245</a>
          </li>
          <li>
            <span className="font-medium">Email:</span> <a href="mailto: support@itsa.com" target='_blank'>support@itsa.com</a>
          </li>
        </ul>
      </div>
  

      {/* Subheadings can be added within sections as needed */}
    </div>
</>
  );
}

export default StaffHelp
