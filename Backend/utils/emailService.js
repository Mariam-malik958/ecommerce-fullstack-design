import nodemailer from "nodemailer";

// Transporter function ke andar banaya — taake env variables zaroor load ho jayein
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// ─── Order Placed Email ───────────────────────────────────────────────────────
export const sendOrderEmail = async (order, customerEmail) => {
  if (!customerEmail) return;

  const itemsHTML = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #f0f0f0;">
          <strong>${item.name}</strong>
        </td>
        <td style="padding:10px;border-bottom:1px solid #f0f0f0;text-align:center;">
          ${item.qty}
        </td>
        <td style="padding:10px;border-bottom:1px solid #f0f0f0;text-align:right;">
          $${(item.qty * item.price).toFixed(2)}
        </td>
      </tr>`
    )
    .join("");

  const mailOptions = {
    from: `"Brand Store" <${process.env.EMAIL_USER}>`,
    to: customerEmail,
    subject: "✅ Order Placed Successfully",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#1e40af;padding:30px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:24px;">Order Placed!</h1>
        </div>
        <div style="padding:30px;">
          <p style="font-size:16px;color:#374151;">Thank you for your order. We've received it and will process it shortly.</p>
          
          <div style="background:#f9fafb;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="margin:0;font-size:14px;color:#6b7280;">Order ID</p>
            <p style="margin:4px 0 0;font-size:18px;font-weight:bold;color:#111827;">#${String(order._id).slice(-8).toUpperCase()}</p>
          </div>

          <h3 style="color:#111827;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">Items Ordered</h3>
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#f3f4f6;">
                <th style="padding:10px;text-align:left;font-size:13px;color:#6b7280;">ITEM</th>
                <th style="padding:10px;text-align:center;font-size:13px;color:#6b7280;">QTY</th>
                <th style="padding:10px;text-align:right;font-size:13px;color:#6b7280;">PRICE</th>
              </tr>
            </thead>
            <tbody>${itemsHTML}</tbody>
          </table>

          <div style="text-align:right;margin-top:16px;padding-top:16px;border-top:2px solid #e5e7eb;">
            <span style="font-size:18px;font-weight:bold;color:#1e40af;">Total: $${order.totalPrice.toFixed(2)}</span>
          </div>

          <div style="background:#eff6ff;border-left:4px solid #1e40af;padding:16px;margin-top:24px;border-radius:4px;">
            <h4 style="margin:0 0 8px;color:#1e40af;">Shipping To</h4>
            <p style="margin:0;color:#374151;font-size:14px;">
              ${order.shippingAddress?.address}, ${order.shippingAddress?.city}<br/>
              ${order.shippingAddress?.country} - ${order.shippingAddress?.postalCode}
            </p>
          </div>

          <p style="margin-top:24px;color:#6b7280;font-size:14px;">
            You'll receive another email once your order is confirmed by our team.
          </p>
        </div>
        <div style="background:#f9fafb;padding:20px;text-align:center;">
          <p style="margin:0;color:#9ca3af;font-size:12px;">© 2025 Brand Store. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);
    console.log(`Order placed email sent to ${customerEmail}`);
  } catch (error) {
    console.error("Error sending order placed email:", error.message);
  }
};

// ─── Order Confirmed Email ────────────────────────────────────────────────────
export const sendOrderConfirmationEmail = async (order, customerEmail) => {
  if (!customerEmail) return;

  const itemsHTML = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #f0f0f0;">
          <strong>${item.name}</strong>
        </td>
        <td style="padding:10px;border-bottom:1px solid #f0f0f0;text-align:center;">
          ${item.qty}
        </td>
        <td style="padding:10px;border-bottom:1px solid #f0f0f0;text-align:right;">
          $${(item.qty * item.price).toFixed(2)}
        </td>
      </tr>`
    )
    .join("");

  const mailOptions = {
    from: `"Brand Store" <${process.env.EMAIL_USER}>`,
    to: customerEmail,
    subject: "🚚 Order Confirmed — On The Way!",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#065f46;padding:30px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:24px;">Order Confirmed!</h1>
          <p style="color:#a7f3d0;margin:8px 0 0;font-size:15px;">Your order is on the way 🚚</p>
        </div>
        <div style="padding:30px;">
          <p style="font-size:16px;color:#374151;">
            Great news! Your order has been confirmed by our team and is now being prepared for shipping.
          </p>

          <div style="background:#f0fdf4;border-radius:8px;padding:16px;margin:20px 0;border:1px solid #bbf7d0;">
            <p style="margin:0;font-size:14px;color:#6b7280;">Order ID</p>
            <p style="margin:4px 0 0;font-size:18px;font-weight:bold;color:#065f46;">#${String(order._id).slice(-8).toUpperCase()}</p>
          </div>

          <div style="display:flex;justify-content:space-between;margin:28px 0;text-align:center;">
            <div style="flex:1;">
              <div style="width:36px;height:36px;background:#065f46;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 6px;">
                <span style="color:white;font-size:16px;">✓</span>
              </div>
              <p style="margin:0;font-size:12px;font-weight:600;color:#065f46;">Placed</p>
            </div>
            <div style="flex:1;position:relative;">
              <div style="position:absolute;top:18px;left:-50%;right:50%;height:2px;background:#065f46;"></div>
              <div style="width:36px;height:36px;background:#065f46;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 6px;">
                <span style="color:white;font-size:16px;">✓</span>
              </div>
              <p style="margin:0;font-size:12px;font-weight:600;color:#065f46;">Confirmed</p>
            </div>
            <div style="flex:1;position:relative;">
              <div style="position:absolute;top:18px;left:-50%;right:50%;height:2px;background:#e5e7eb;"></div>
              <div style="width:36px;height:36px;background:#e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 6px;">
                <span style="color:#9ca3af;font-size:16px;">🚚</span>
              </div>
              <p style="margin:0;font-size:12px;color:#9ca3af;">Shipped</p>
            </div>
            <div style="flex:1;position:relative;">
              <div style="position:absolute;top:18px;left:-50%;right:50%;height:2px;background:#e5e7eb;"></div>
              <div style="width:36px;height:36px;background:#e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 6px;">
                <span style="color:#9ca3af;font-size:16px;">📦</span>
              </div>
              <p style="margin:0;font-size:12px;color:#9ca3af;">Delivered</p>
            </div>
          </div>

          <h3 style="color:#111827;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">Items</h3>
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#f3f4f6;">
                <th style="padding:10px;text-align:left;font-size:13px;color:#6b7280;">ITEM</th>
                <th style="padding:10px;text-align:center;font-size:13px;color:#6b7280;">QTY</th>
                <th style="padding:10px;text-align:right;font-size:13px;color:#6b7280;">PRICE</th>
              </tr>
            </thead>
            <tbody>${itemsHTML}</tbody>
          </table>

          <div style="text-align:right;margin-top:16px;padding-top:16px;border-top:2px solid #e5e7eb;">
            <span style="font-size:18px;font-weight:bold;color:#065f46;">Total: $${order.totalPrice.toFixed(2)}</span>
          </div>

          <div style="background:#f0fdf4;border-left:4px solid #065f46;padding:16px;margin-top:24px;border-radius:4px;">
            <h4 style="margin:0 0 8px;color:#065f46;">Shipping To</h4>
            <p style="margin:0;color:#374151;font-size:14px;">
              ${order.shippingAddress?.address}, ${order.shippingAddress?.city}<br/>
              ${order.shippingAddress?.country} - ${order.shippingAddress?.postalCode}
            </p>
          </div>

          <p style="margin-top:24px;color:#6b7280;font-size:14px;">
            Expected delivery: <strong>3–5 business days</strong>
          </p>
        </div>
        <div style="background:#f9fafb;padding:20px;text-align:center;">
          <p style="margin:0;color:#9ca3af;font-size:12px;">© 2025 Brand Store. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${customerEmail}`);
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
  }
};