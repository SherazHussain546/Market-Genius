import Script from "next/script";

export default function TestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p>This page embeds the Blogify script.</p>
      
      {/* The script will look for an element with this ID to render the content */}
      <div id="blogify-embed"></div>

      <Script 
        src="https://embed.blogify.blog/embed.js" 
        strategy="afterInteractive" 
      />
    </div>
  );
}
