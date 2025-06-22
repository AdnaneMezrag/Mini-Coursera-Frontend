import DOMPurify from 'dompurify';

const SafeHTML = ({ html }: { html: string }) => {
  
  // Clean the HTML before rendering
  const cleanHTML = DOMPurify.sanitize(html);

  return <div className='w-full text-base leading-relaxed text-gray-800 [&_h2]:text-2xl [&_pre]:overflow-x-auto [&_ul]:list-disc [&_ul]:pl-5' dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};

export default SafeHTML;