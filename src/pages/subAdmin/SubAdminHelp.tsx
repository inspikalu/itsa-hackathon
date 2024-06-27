import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface HelpAndSupportProps {}

const SubAdminHelp: React.FC<HelpAndSupportProps> = function () {
  const [activeFaqIndex, setActiveFaqIndex] = React.useState<number>(0);

  const handleFaqClick = (index: number) => {
    setActiveFaqIndex(index === activeFaqIndex ? -1 : index); // Toggle open/close
  };

  return (
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
          {['What is a sub admin?', 'How do I create a new staff account?', /* Add more FAQ questions here */].map(
            (question, index) => (
              <div key={question} className="mb-4">
                <button
                  className={`w-full text-left font-medium text-white bg-blue-950 rounded px-4 py-2 hover:bg-blue-900 focus:outline-none ${
                    activeFaqIndex === index ? 'border-b border-blue-500' : ''
                  }`}
                  type="button"
                  onClick={() => handleFaqClick(index)}
                >
                  {question} {activeFaqIndex !== index ? <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-gray-400" />: <FontAwesomeIcon icon={faChevronUp} className="ml-2 text-gray-400" />}
                </button>
                {activeFaqIndex === index && (
                  <div className="p-4 text-gray-200 pl-8">
                    <p>
                      {index === 0 && (
                        <span>
                          A sub admin is a user within an organization who has been granted permission to manage staff accounts, devices, and maintenance requests.
                        </span>
                      )}
                      {index === 1 && (
                        <span>
                          To create a new staff account, navigate to the "Staff Management" section and click "Create Staff Account." Fill in the required information, such as name, email address, and assigned devices. You can also set permissions for the new staff member.
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
  );
};

export default SubAdminHelp;