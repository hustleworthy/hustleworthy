import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service - Hustleworthy',
  description: 'Read the terms and conditions for using Hustleworthy, your trusted source for money-making website reviews.',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Hustleworthy ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website and services, which provide honest reviews of money-making websites and earning opportunities online.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of these Terms, then you may not access our services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of our services after such changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Description of Service */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hustleworthy is a platform designed to help people find legitimate ways to earn money online. Our services include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Honest reviews and ratings of money-making websites</li>
                <li>User-generated content and experiences</li>
                <li>Educational content about online earning opportunities</li>
                <li>Community features for sharing experiences and advice</li>
                <li>Newsletter with earning tips and new site alerts</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Our goal is to provide trustworthy information to help users make informed decisions about online earning opportunities while avoiding scams and fraudulent schemes.
              </p>
            </section>

            {/* User Accounts */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access certain features of our service, you may need to create an account. When creating an account, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your login credentials secure and confidential</li>
                <li>Notify us immediately of any unauthorized account use</li>
                <li>Be responsible for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate your account at our sole discretion, with or without notice, for violation of these Terms or any other reason we deem appropriate.
              </p>
            </section>

            {/* User Content and Conduct */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Content and Conduct</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Guidelines</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When posting reviews, comments, or other content on our platform, you agree that your content will:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Be truthful and based on your genuine experience</li>
                <li>Not contain false, misleading, or deceptive information</li>
                <li>Not violate any applicable laws or regulations</li>
                <li>Not infringe on intellectual property rights</li>
                <li>Not contain offensive, harmful, or inappropriate material</li>
                <li>Not promote illegal activities or scams</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Prohibited Activities</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Users are prohibited from:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Posting fake reviews or manipulating ratings</li>
                <li>Spam, harassment, or abusive behavior</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Using our platform to distribute malware or viruses</li>
                <li>Scraping or automated data collection</li>
                <li>Impersonating others or creating multiple accounts</li>
                <li>Commercial activities without prior approval</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content License</h3>
              <p className="text-gray-700 leading-relaxed">
                By posting content on our platform, you grant us a non-exclusive, worldwide, royalty-free license to use, display, modify, and distribute your content in connection with our services. You retain ownership of your content.
              </p>
            </section>

            {/* Reviews and Ratings */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews and Ratings Policy</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Review Standards</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All reviews on our platform must meet the following standards:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Based on genuine personal experience with the reviewed service</li>
                <li>Factual and honest representation of your experience</li>
                <li>Constructive and helpful to other users</li>
                <li>Free from conflicts of interest or bias</li>
                <li>Respectful and professional in tone</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Review Moderation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to moderate, edit, or remove reviews that:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Violate our content guidelines</li>
                <li>Appear to be fake or fraudulent</li>
                <li>Contain inappropriate language or content</li>
                <li>Are off-topic or irrelevant</li>
                <li>Violate privacy or confidentiality</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Content</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Hustleworthy website, including its design, text, graphics, logos, and other content, is owned by us and protected by copyright, trademark, and other intellectual property laws. You may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Copy, reproduce, or distribute our content without permission</li>
                <li>Use our trademarks or logos without authorization</li>
                <li>Create derivative works based on our content</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Copyright Infringement</h3>
              <p className="text-gray-700 leading-relaxed">
                If you believe your copyright has been infringed on our platform, please contact us with detailed information about the alleged infringement. We will investigate and take appropriate action in accordance with applicable copyright laws.
              </p>
            </section>

            {/* Disclaimers */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers and Limitations</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Guarantee of Earnings</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Important:</strong> Hustleworthy provides information and reviews about money-making opportunities, but we do not guarantee any earnings or success. Earning potential varies widely and depends on many factors including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Individual effort and commitment</li>
                <li>Market conditions and competition</li>
                <li>Skills and experience level</li>
                <li>Time investment and availability</li>
                <li>External factors beyond our control</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Services</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our reviews cover third-party websites and services. We are not affiliated with, endorsed by, or responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>The accuracy of information provided by third parties</li>
                <li>Payment issues or disputes with reviewed services</li>
                <li>Changes to third-party terms or policies</li>
                <li>Security or privacy practices of external websites</li>
                <li>Availability or functionality of reviewed services</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h3>
              <p className="text-gray-700 leading-relaxed">
                We strive to maintain high availability of our services, but we do not guarantee uninterrupted access. Our services may be temporarily unavailable due to maintenance, updates, or technical issues.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the fullest extent permitted by law, Hustleworthy and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Loss of profits or earning opportunities</li>
                <li>Business interruption or loss of data</li>
                <li>Damages resulting from third-party services</li>
                <li>Any losses related to earning activities</li>
                <li>User-generated content or reviews</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Our total liability for any claims arising from your use of our services shall not exceed the amount you paid to us in the 12 months preceding the claim, or $100, whichever is greater.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Hustleworthy and its affiliates from any claims, damages, losses, or expenses (including attorney fees) arising from your use of our services, violation of these Terms, or infringement of any rights of third parties.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Disputes</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration, except for claims that may be brought in small claims court.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You waive any right to participate in class action lawsuits or class-wide arbitration against us.
              </p>
            </section>

            {/* Severability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall remain in full force and effect. The unenforceable provision shall be replaced with an enforceable provision that most closely reflects our original intent.
              </p>
            </section>

            {/* Entire Agreement */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Entire Agreement</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Hustleworthy regarding your use of our services and supersede all prior or contemporaneous communications and proposals.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> info@hustleworthy.com</p>
                <p className="text-gray-700 mb-2"><strong>Website:</strong> <Link href="/" className="text-[#03a9f4] hover:text-blue-600">www.hustleworthy.com</Link></p>
                <p className="text-gray-700">
                  <strong>Response Time:</strong> We aim to respond to all legal inquiries within 7 business days.
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acknowledgment</h2>
              <p className="text-gray-700 leading-relaxed">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. You also acknowledge that you have read and understand our Privacy Policy.
              </p>
            </section>

          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <div className="space-x-6">
            <Link href="/privacy" className="text-[#03a9f4] hover:text-blue-600 transition-colors duration-300">
              Privacy Policy
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
