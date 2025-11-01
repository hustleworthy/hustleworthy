'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import { useState } from 'react';
import Featuredon from '../../public/images/featuredon.png';
import Image from 'next/image';

export default function ClaimProfileButton({ websiteName, domain }: { websiteName: string, domain: string }) {
  const { data: session } = useSession();
  const [claimPopupOpen, setClaimPopupOpen] = useState(false);
  const [embeedCodePopupOpen, setEmbeedCodePopupOpen] = useState(false);

  const handleClick = () => {
    session?.user?.email ? setClaimPopupOpen(true) : redirect('/auth/login');
  }

  return (
    <>
    <button 
      className="group relative inline-flex items-center justify-center px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-out border border-blue-500 hover:border-blue-600"
      onClick={handleClick}
    >
      <svg className="w-3 h-3 mr-1.5 group-hover:rotate-12 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Claim Profile
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-200"></div>
    </button>
    <ClaimProfilePopup
      isOpen={claimPopupOpen}
      onClose={() => setClaimPopupOpen(false)}
      websiteName={websiteName}
      domain={domain}
      setEmbeedCodePopupOpen={setEmbeedCodePopupOpen}
    />
    <EmbeedCodePopup
      isOpen={embeedCodePopupOpen}
      onClose={() => setEmbeedCodePopupOpen(false)}
      websiteName={websiteName}
      domain={domain}
    />
    </>
  )
}

/* Claim Profile Popup */
interface ClaimProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  websiteName: string;
  domain: string;
  setEmbeedCodePopupOpen: (open: boolean) => void;
}

function ClaimProfilePopup({ isOpen, onClose, websiteName, domain, setEmbeedCodePopupOpen }: ClaimProfilePopupProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
          >
            ×
          </button>
          <div className="pr-12">
            <h2 className="text-2xl font-bold mb-2">Verify {websiteName}</h2>
            <p className="text-blue-100 text-sm">
              Verify {domain.replace(/^https?:\/\//, '')} for free to gain edit rights and boost credibility
            </p>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-8 overflow-y-auto flex-1">
          {/* Introduction */}
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose How To Verify Ownership</h3>
            <p className="text-gray-600">Select your preferred verification method to get started</p>
          </div>
          
          {/* Verification Methods */}
          <div className="space-y-4">
            {/* Embed Code Option */}
            <div 
              className="group p-6 border-2 border-blue-200 rounded-xl cursor-pointer transition-all hover:border-blue-400 hover:shadow-lg bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200"
              onClick={() => {setEmbeedCodePopupOpen(true); onClose();}}
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-700 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">Embed Code Verification</h4>
                  <p className="text-gray-600 text-sm mb-3">Add a simple anchor tag to your website's HTML</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-green-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Boosts your Hustle Worthy Profile
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Increased Leads from Profile
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                      Recommended
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* File Upload Option */}
            <div 
              className="group p-6 border-2 border-gray-200 rounded-xl cursor-pointer transition-all hover:border-gray-400 hover:shadow-lg bg-gray-50 hover:bg-gray-100"
              onClick={() => {setEmbeedCodePopupOpen(false); onClose();}}
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-gray-700 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">File Upload Verification</h4>
                  <p className="text-gray-600 text-sm mb-3">Upload a verification file to your website's root directory</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Alternative verification method
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Requires FTP/file access
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="p-6 border-t border-gray-200 flex-shrink-0 rounded-b-2xl bg-white">
          <div className="text-center">
            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-full transition-all border border-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Embeed Code Popup */
interface EmbeedCodePopupProps {
  isOpen: boolean;
  onClose: () => void;
  websiteName: string;
  domain: string;
}

function EmbeedCodePopup({ isOpen, onClose, websiteName, domain }: EmbeedCodePopupProps) {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRequestingManual, setIsRequestingManual] = useState(false);
  const embedCode = ` <a href="https://hustleworthy.com/reviews/${encodeURIComponent(websiteName?.toLowerCase().replace(/\s+/g, '-') || 'website')}" target="_blank" rel="nofollow"><img width="300" src="https://hustleworthy.com/images/featuredon.png"></a>`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = embedCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleVerifyCode = async () => {
    setIsVerifying(true);
    const response = await fetch(`/api/embed-code-verify?url=${encodeURIComponent(domain)}`);
    const data = await response.json();
    //console.log(data.html);
    if(data.html.includes(embedCode)) {
      alert('Website is verified');
      onClose();
      redirect(`/reviews/${encodeURIComponent(websiteName?.toLowerCase().replace(/\s+/g, '-') || 'website')}`);
    }
    else {
      alert('Sorry something went wrong. Please request manual verification.');
      //onClose();
      setIsVerifying(false);
      return;
    }
  };

  const handleManualVerification = async () => {
    if (!session?.user?.email) {
      alert('Please log in to request manual verification');
      return;
    }

    setIsRequestingManual(true);
    
    try {
      const response = await fetch('/api/manual-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: session.user.email,
          websiteName,
          domain,
        }),
      });

      if (response.ok) {
        alert('Manual verification request sent successfully! We will review your details and get back to you as soon as possible.');
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Failed to send request: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error requesting manual verification:', error);
      alert('Failed to send verification request. Please try again.');
    } finally {
      setIsRequestingManual(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
          >
            ×
          </button>
          <div className="pr-12">
            <h2 className="text-2xl font-bold mb-2">Verify {websiteName}</h2>
            <p className="text-blue-100 text-sm">
              Verify {domain.replace(/^https?:\/\//, '')} to unlock powerful features and boost your credibility
            </p>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-8 overflow-y-auto flex-1">
          {/* Benefits Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Benefits of getting verified</h3>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Track stats such as opens, clicks, saves and search impressions</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Removes the need for manual edits by our team, which cost $49 each</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Verified Pages get 6 times more clicks on average compared to non-verified AIs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Verification Steps */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                  </svg>
                </div>
              <h3 className="text-xl font-semibold text-gray-900">Verification steps</h3>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <ol className="text-gray-700 mb-4 space-y-3 list-decimal list-inside">
                <li>
                  Place the embed code below on this page: 
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded ml-2">
                    {domain.replace(/^https?:\/\//, '')}
                  </span>
                </li>
                <li>
                  Make sure the code is only present on that single page. For example, if your website's pages have a common header or footer, placing it there might confuse our crawler and verify the wrong page.
                </li>
                <li>
                  Click the button below to verify.
                </li>
              </ol>
              
              {/* Embed Code Section */}
              <div className="bg-white border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                <div className="mb-4">
                  <Image 
                    src={Featuredon} 
                    alt="Featured On" 
                    width={250} 
                    height={250} 
                    className="mx-auto rounded-lg shadow-md mb-4" 
                  />
                 <button 
                  onClick={handleCopyCode}
                  className={`font-semibold px-6 py-3 text-[11px] lg:text-base rounded-full transition-all transform hover:scale-105 shadow-lg ${
                    copied 
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      ✅ Copied!
                    </>
                  ) : (
                    <>
                      📋 Copy Embed Code
                    </>
                  )}
                </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer - Fixed */}
        <div className="p-6 border-t border-gray-200 flex-shrink-0 rounded-b-2xl bg-white">
          <div className="space-y-3 lg:flex block sm:flex items-center justify-center gap-4">
            <button 
              onClick={handleVerifyCode}
              disabled={isVerifying}
              className={`w-full font-semibold px-6 py-3 text-sm rounded-full transition-all transform shadow-lg flex items-center justify-center ${
                isVerifying 
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:scale-105'
              }`}
            >
              {isVerifying ? (
                <>
                  <svg className="w-5 h-5 mr-2 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Verifying it can take upto 1 min.
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Code placed, verify now!
                </>
              )}
            </button>
            <button 
              onClick={handleManualVerification}
              disabled={isRequestingManual}
              className={`w-full font-semibold px-6 py-3 text-sm rounded-full transition-all transform shadow-lg flex items-center justify-center ${
                isRequestingManual 
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105'
              }`}
            >
              {isRequestingManual ? (
                <>
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Sending request...
                </>
              ) : (
                'Request manual verification'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
