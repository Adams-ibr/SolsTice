import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import InquiryPopup from '../components/InquiryPopup';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import ProductGridSkeleton from '../components/ProductGridSkeleton';

// Add type declarations for CDN-loaded libraries
declare global {
  interface Window {
    jspdf: any;
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ProductsPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const generateAndDownloadCatalog = () => {
    setIsGeneratingPdf(true);

    // Defer generation to allow UI to update
    setTimeout(() => {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Header
            doc.setFont('Inter', 'bold');
            doc.setFontSize(22);
            doc.setTextColor('#1A472A'); // brand-green
            doc.text("SolsTice Agro Exports", 14, 22);

            doc.setFont('Inter', 'normal');
            doc.setFontSize(16);
            doc.setTextColor('#D4AF37'); // brand-gold
            doc.text("Product Catalog", 14, 32);

            // Introduction
            doc.setFontSize(10);
            doc.setTextColor('#333333');
            const introText = "This catalog contains our range of premium, ethically sourced agricultural commodities. All prices are indicative and subject to change based on market conditions and order volume. Please contact us for a detailed quote.";
            const splitIntro = doc.splitTextToSize(introText, 180);
            doc.text(splitIntro, 14, 45);

            // Table Data
            const tableColumn = ["Product Name", "Description", "Price per Ton (indicative)"];
            const tableRows = PRODUCTS.map(product => [
                product.name,
                doc.splitTextToSize(product.description, 80),
                product.pricePerTon
            ]);
            
            // Create Table
            (doc as any).autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 65,
                theme: 'grid',
                headStyles: {
                    fillColor: '#1A472A',
                    textColor: '#FFFFFF',
                    fontStyle: 'bold'
                },
                styles: {
                    cellPadding: 3,
                    fontSize: 9,
                    valign: 'middle',
                    font: 'Inter'
                },
                didDrawPage: (data: any) => {
                    // Footer
                    const pageCount = doc.internal.getNumberOfPages();
                    doc.setFontSize(8);
                    doc.setTextColor('#666666');
                    doc.text(`Page ${data.pageNumber} of ${pageCount}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
                    doc.text(`© ${new Date().getFullYear()} SolsTice Agro Exports | info@solstice.com`, doc.internal.pageSize.width - data.settings.margin.right, doc.internal.pageSize.height - 10, { align: 'right' });
                }
            });

            doc.save("SolsTice-Product-Catalog.pdf");

        } catch (error) {
            console.error("Failed to generate PDF:", error);
            alert("An error occurred while generating the catalog. Please try again.");
        } finally {
            setIsGeneratingPdf(false);
        }
    }, 100);
  };

  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-green text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Our Products</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">Explore our range of premium, ethically sourced agricultural commodities.</p>
          </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mb-8">
              <motion.button 
                onClick={() => setIsPopupOpen(true)}
                className="bg-brand-green text-white hover:bg-opacity-90 font-bold py-2 px-6 rounded-md transition-colors w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Inquire for Bulk Order
              </motion.button>
              <motion.button 
                onClick={generateAndDownloadCatalog}
                disabled={isGeneratingPdf}
                className="bg-brand-gold text-white text-center hover:bg-opacity-90 font-bold py-2 px-6 rounded-md transition-colors w-full sm:w-auto disabled:opacity-70 disabled:cursor-wait"
                whileHover={{ scale: isGeneratingPdf ? 1 : 1.05 }}
                whileTap={{ scale: isGeneratingPdf ? 1 : 0.95 }}
              >
                {isGeneratingPdf ? 'Generating...' : 'Download Catalogue (PDF)'}
              </motion.button>
          </div>
          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </AnimatedSection>

      <InquiryPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        products={PRODUCTS}
      />
    </AnimatedPage>
  );
};

export default ProductsPage;