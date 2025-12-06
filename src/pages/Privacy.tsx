import React from "react";
import { Link } from "react-router-dom";
import MouseParallaxWrapper from "../components/common/MouseParallaxWrapper";

const Privacy: React.FC = () => {
  return (
    <MouseParallaxWrapper intensity={20}>
    <div className="px-6 pt-24 pb-20">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-deep-blue-soft/80 p-8 shadow-soft-glow">
        
        {/* Page Heading */}
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
          Privacy Policy
        </h1>

        <p className="text-text-muted text-sm mb-8">
          Last updated: 2025
        </p>

        {/* Content */}
        <div
          className="
            prose prose-invert max-w-none
            prose-p:text-[1rem] prose-p:leading-relaxed
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
            prose-ul:pl-5 prose-li:my-1
          "
        >
          <p>
            This website is a personal portfolio created to showcase my work, projects,
            and experience. I do <strong>not collect, store, or share any personal information</strong>
            from visitors.
          </p>

          <h2>Information I Do Not Collect</h2>
          <ul>
            <li>No names</li>
            <li>No contact details</li>
            <li>No form submissions</li>
            <li>No personal identifiers</li>
            <li>No marketing or tracking data</li>
          </ul>

          <h2>Analytics</h2>
          <p>
            This website does <strong>not use cookies or analytics</strong> unless explicitly added
            in the future. If tools like Google Analytics or Vercel Analytics are enabled later,
            they would only collect anonymous usage information (such as page views, device type,
            and time spent on pages).
          </p>

          <h2>External Links</h2>
          <p>
            This website contains links to external sites such as GitHub, LinkedIn, or email.
            These websites have their own privacy policies, and I am not responsible for their content
            or data handling.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any concerns or questions about this Privacy Policy, you may contact me at:
          </p>
          <p className="text-accent-gold font-medium">satviksingh164@gmail.com</p>
        </div>

        {/* Back Link */}
        <div className="mt-10">
          <Link
            to="/"
            className="text-sm text-accent-gold hover:text-accent-orange"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
    </MouseParallaxWrapper>
  );
};

export default Privacy;
