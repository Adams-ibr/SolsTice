import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send contact form notification
export const sendContactNotification = async (contact) => {
  try {
    const transporter = createTransporter();

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${contact.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d5016; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2d5016; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${contact.company || 'Not provided'}</p>
            <p><strong>Country:</strong> ${contact.country || 'Not provided'}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2d5016; margin-top: 0;">Message</h3>
            <p><strong>Subject:</strong> ${contact.subject}</p>
            <p style="white-space: pre-wrap;">${contact.message}</p>
          </div>

          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Submitted:</strong> ${contact.createdAt.toLocaleString()}<br>
              <strong>Contact ID:</strong> ${contact._id}
            </p>
          </div>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Please respond to this inquiry promptly to maintain our excellent customer service standards.
          </p>
        </div>
      `,
    };

    // Auto-reply to customer
    const customerMailOptions = {
      from: process.env.EMAIL_FROM,
      to: contact.email,
      subject: 'Thank you for contacting SolsTice Agro Exports',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background-color: #2d5016; color: white;">
            <h1 style="margin: 0; font-size: 28px;">SolsTice Agro Exports</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Premium Nigerian Agro-Commodities</p>
          </div>

          <div style="padding: 30px 20px;">
            <h2 style="color: #2d5016;">Thank you for your inquiry!</h2>
            
            <p>Dear ${contact.name},</p>
            
            <p>Thank you for contacting SolsTice Agro Exports. We have received your message regarding "${contact.subject}" and appreciate your interest in our premium agricultural commodities.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #2d5016; margin-top: 0;">What happens next?</h3>
              <ul style="color: #666;">
                <li>Our team will review your inquiry within 24 hours</li>
                <li>A dedicated account manager will contact you directly</li>
                <li>We'll provide detailed information and competitive pricing</li>
                <li>We'll work with you to arrange logistics and delivery</li>
              </ul>
            </div>

            <p>In the meantime, feel free to:</p>
            <ul style="color: #666;">
              <li>Browse our <a href="${process.env.FRONTEND_URL}/products" style="color: #d4a574;">product catalog</a></li>
              <li>Read our latest <a href="${process.env.FRONTEND_URL}/blog" style="color: #d4a574;">industry insights</a></li>
              <li>Connect with us on WhatsApp: <a href="https://wa.me/2348012345678" style="color: #d4a574;">+234 801 234 5678</a></li>
            </ul>

            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 30px 0;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                <strong>Reference Number:</strong> ${contact._id}<br>
                <strong>Submitted:</strong> ${contact.createdAt.toLocaleString()}
              </p>
            </div>

            <p>Best regards,<br>
            <strong>The SolsTice Team</strong></p>
          </div>

          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 14px; color: #666;">
            <p style="margin: 0;">SolsTice Agro Exports</p>
            <p style="margin: 5px 0;">No. 19 Fandriana Close, Wuse 2, Abuja, Nigeria</p>
            <p style="margin: 5px 0;">Email: info@solstice.com | Phone: +234 801 234 5678</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    console.log('Contact notification emails sent successfully');
  } catch (error) {
    console.error('Error sending contact notification:', error);
    throw error;
  }
};

// Send inquiry notification
export const sendInquiryNotification = async (inquiry) => {
  try {
    const transporter = createTransporter();

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Bulk Order Inquiry - ${inquiry.product}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d5016; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">
            New Bulk Order Inquiry
          </h2>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #d4a574;">
            <p style="margin: 0; font-weight: bold; color: #856404;">
              Priority: ${inquiry.priority.toUpperCase()} | 
              Estimated Value: $${inquiry.estimatedValue?.toLocaleString() || 'N/A'}
            </p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2d5016; margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${inquiry.name}</p>
            <p><strong>Email:</strong> ${inquiry.email}</p>
            <p><strong>Company:</strong> ${inquiry.company || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${inquiry.phone || 'Not provided'}</p>
            <p><strong>Country:</strong> ${inquiry.country || 'Not provided'}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2d5016; margin-top: 0;">Order Details</h3>
            <p><strong>Product:</strong> ${inquiry.product}</p>
            <p><strong>Quantity:</strong> ${inquiry.quantity ? `${inquiry.quantity} ${inquiry.quantityUnit.replace('-', ' ')}` : 'Not specified'}</p>
            <p><strong>Delivery Port:</strong> ${inquiry.deliveryPort || 'Not specified'}</p>
            <p><strong>Urgency:</strong> ${inquiry.urgency.replace('-', ' ')}</p>
            <p><strong>Budget Range:</strong> ${inquiry.budget.replace('-', ' ')}</p>
          </div>

          ${inquiry.message ? `
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2d5016; margin-top: 0;">Additional Message</h3>
            <p style="white-space: pre-wrap;">${inquiry.message}</p>
          </div>
          ` : ''}

          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Submitted:</strong> ${inquiry.createdAt.toLocaleString()}<br>
              <strong>Inquiry ID:</strong> ${inquiry._id}<br>
              <strong>Reference:</strong> INQ-${inquiry._id.toString().slice(-8).toUpperCase()}
            </p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/admin/inquiries/${inquiry._id}" 
               style="background-color: #2d5016; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View in Admin Panel
            </a>
          </div>
        </div>
      `,
    };

    // Auto-reply to customer
    const customerMailOptions = {
      from: process.env.EMAIL_FROM,
      to: inquiry.email,
      subject: 'Your Bulk Order Inquiry - SolsTice Agro Exports',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background-color: #2d5016; color: white;">
            <h1 style="margin: 0; font-size: 28px;">SolsTice Agro Exports</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Premium Nigerian Agro-Commodities</p>
          </div>

          <div style="padding: 30px 20px;">
            <h2 style="color: #2d5016;">Thank you for your bulk order inquiry!</h2>
            
            <p>Dear ${inquiry.name},</p>
            
            <p>Thank you for your interest in our ${inquiry.product}. We have received your bulk order inquiry and our team is already working on preparing a competitive quote for you.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #2d5016; margin-top: 0;">Your Inquiry Summary</h3>
              <p><strong>Product:</strong> ${inquiry.product}</p>
              <p><strong>Quantity:</strong> ${inquiry.quantity ? `${inquiry.quantity} ${inquiry.quantityUnit.replace('-', ' ')}` : 'To be discussed'}</p>
              <p><strong>Reference Number:</strong> INQ-${inquiry._id.toString().slice(-8).toUpperCase()}</p>
            </div>

            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #2d5016; margin-top: 0;">Next Steps</h3>
              <ul style="color: #666; margin: 0; padding-left: 20px;">
                <li>Our sales team will contact you within 24 hours</li>
                <li>We'll provide detailed product specifications and pricing</li>
                <li>We'll discuss logistics and delivery options</li>
                <li>We'll prepare a formal quotation based on your requirements</li>
              </ul>
            </div>

            <p><strong>Need immediate assistance?</strong></p>
            <p>Contact us directly:</p>
            <ul style="color: #666;">
              <li>WhatsApp: <a href="https://wa.me/2348012345678" style="color: #d4a574;">+234 801 234 5678</a></li>
              <li>Email: <a href="mailto:info@solstice.com" style="color: #d4a574;">info@solstice.com</a></li>
              <li>Phone: +234 801 234 5678</li>
            </ul>

            <p>We look forward to serving you and building a long-term partnership.</p>

            <p>Best regards,<br>
            <strong>The SolsTice Sales Team</strong></p>
          </div>

          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 14px; color: #666;">
            <p style="margin: 0;">SolsTice Agro Exports</p>
            <p style="margin: 5px 0;">No. 19 Fandriana Close, Wuse 2, Abuja, Nigeria</p>
            <p style="margin: 5px 0;">Email: info@solstice.com | Phone: +234 801 234 5678</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    console.log('Inquiry notification emails sent successfully');
  } catch (error) {
    console.error('Error sending inquiry notification:', error);
    throw error;
  }
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return false;
  }
};