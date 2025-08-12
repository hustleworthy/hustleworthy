import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy - Hustleworthy',
  description: 'Learn how Hustleworthy protects your privacy and handles your personal information.',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="mt-6">
            <Link href="/" className="text-[#03a9f4] hover:text-blue-600 transition-colors duration-300">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Hustleworthy ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services to discover and review money-making websites and earning opportunities online.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our website, you consent to the practices described in this Privacy Policy. If you do not agree with this policy, please do not use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect personal information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Name and email address when you create an account</li>
                <li>Profile information and preferences</li>
                <li>Reviews, ratings, and comments you submit</li>
                <li>Communication with our support team</li>
                <li>Newsletter subscription information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you use our website, we automatically collect certain information, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referral sources and search terms</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Provide and maintain our review platform services</li>
                <li>Process user registrations and manage accounts</li>
                <li>Display and moderate user reviews and ratings</li>
                <li>Send newsletters and updates about earning opportunities</li>
                <li>Improve our website and user experience</li>
                <li>Analyze usage patterns and website performance</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Comply with legal obligations</li>
                <li>Communicate with users about their accounts or our services</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Public Reviews:</strong> Reviews and ratings you submit are displayed publicly on our platform</li>
                <li><strong>Service Providers:</strong> Trusted third-party service providers who assist with website operations</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                <li><strong>Consent:</strong> When you explicitly consent to sharing your information</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure database storage with access controls</li>
                <li>Regular security audits and updates</li>
                <li>Employee training on data protection practices</li>
                <li>Incident response procedures</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Remember your preferences and login status</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Provide personalized content and recommendations</li>
                <li>Measure the effectiveness of our marketing campaigns</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can control cookie settings through your browser preferences. However, disabling cookies may affect certain features of our website.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to certain types of data processing</li>
                <li><strong>Restriction:</strong> Request restriction of data processing</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe and as required by applicable law.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website contains links to third-party websites and services that we review. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party websites you visit through our platform.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information promptly.
              </p>
            </section>

            {/* International Users */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>
              <p className="text-gray-700 leading-relaxed">
                If you are accessing our website from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States. By using our services, you consent to the transfer of your information to the United States and other jurisdictions as described in this Privacy Policy.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> info@hustleworthy.com</p>
                <p className="text-gray-700 mb-2"><strong>Website:</strong> <Link href="/" className="text-[#03a9f4] hover:text-blue-600">www.hustleworthy.com</Link></p>
                <p className="text-gray-700">
                  <strong>Response Time:</strong> We aim to respond to all privacy-related inquiries within 30 days.
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <div className="space-x-6">
            <Link href="/terms" className="text-[#03a9f4] hover:text-blue-600 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/" className="text-[#03a9f4] hover:text-blue-600 transition-colors duration-300">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
