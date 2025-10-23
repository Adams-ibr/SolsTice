// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import SectionTitle from '../components/SectionTitle';
import { Button } from '../components/ui/Button';
import { DownloadIcon } from '../components/icons';

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
  const [loading, setLoading] = React.useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = React.useState(false);

  React.useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadCatalog = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Header
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor('#1A472A');
            doc.text("SolsTice Agro Exports", 14, 22);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor('#D4AF37');
            doc.text("Product Catalog", 14, 30);
            doc.setLineWidth(0.5);
            doc.line(14, 32, 196, 32);

            // Table
            const tableColumn = ["Product Name", "Description", "Origin", "Price per Ton", "Harvest Season"];
            const tableRows = PRODUCTS.map(product => [
                product.name,
                product.description,
                product.origin,
                product.pricePerTon,
                product.harvestSeason,
            ]);

            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 40,
                theme: 'grid',
                headStyles: {
                    fillColor: '#1A472A',
                    textColor: '#FFFFFF',
                    fontStyle: 'bold',
                },
                columnStyles: {
                    0: { cellWidth: 35 },
                    1: { cellWidth: 'auto' },
                    2: { cellWidth: 25 },
                    3: { cellWidth: 25 },
                    4: { cellWidth: 30 },
                },
                alternateRowStyles: {
                    fillColor: '#F3F4F6'
                },
                didDrawPage: (data: any) => {
                    // Footer
                    const pageCount = doc.internal.getNumberOfPages();
                    doc.setFontSize(10);
                    doc.setTextColor(150);
                    doc.text(
                        `Page ${data.pageNumber} of ${pageCount}`,
                        data.settings.margin.left,
                        doc.internal.pageSize.height - 10
                    );
                    doc.text(
                        `© ${new Date().getFullYear()} SolsTice Agro Exports`,
                        doc.internal.pageSize.width - data.settings.margin.right,
                        doc.internal.pageSize.height - 10,
                        { align: 'right' }
                    );
                }
            });

            doc.save('SolsTice_Product_Catalog.pdf');
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Sorry, there was an error generating the catalog. Please try again later.");
        } finally {
            setIsGeneratingPdf(false);
        }
    }, 100);
  };

  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-green text-white pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Our Agricultural Commodities</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">Discover our range of premium, ethically sourced products from Nigeria.</p>
            <div className="mt-8">
                <Button 
                    onClick={handleDownloadCatalog} 
                    disabled={isGeneratingPdf}
                    variant="outline" 
                    className="text-white border-white hover:bg-white hover:text-brand-green dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-brand-green"
                >
                    {isGeneratingPdf ? (
                        'Generating...'
                    ) : (
                        <div className="flex items-center space-x-2">
                            <DownloadIcon className="w-5 h-5" />
                            <span>Download Catalog</span>
                        </div>
                    )}
                </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionTitle>All Products</SectionTitle>
          {loading ? (
            <ProductGridSkeleton count={PRODUCTS.length} />
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default ProductsPage;