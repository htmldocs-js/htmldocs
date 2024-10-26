import { Document, Footer, Head, Page } from "@htmldocs/react"
import "~/index.css"

interface BillingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface OrderItem {
  name: string;
  description: string;
  quantity: number;
  price: string;
  discountedPrice: string | null;
  image: string;
}

export interface ReceiptProps {
  orderNumber: string;
  orderDate: string;
  orderTotal: string;
  customerName: string;
  billingAddress: BillingAddress;
  items: OrderItem[];
}

function Receipt({ 
  orderNumber,
  orderDate,
  orderTotal,
  customerName,
  billingAddress,
  items 
}: ReceiptProps) {
  return (
    <Document size="A4" orientation="portrait" margin="0.5in">
      <Head>
        <title>Order Confirmation - CloudStack Solutions</title>
      </Head>
      <Page className="flex flex-col gap-4 p-6 font-sans">
        <header className="text-center">
          <img src="/static/axis.svg" alt="Axis" className="mx-auto w-48 mb-1 h-auto" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Order Confirmation</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Thank you for your purchase! Your order has been confirmed and will ship in the next 24 hours. 
            For any inquiries, please reach out to our support team.
          </p>
        </header>

        <div className="flex justify-center mb-6">
          <a href="https://www.google.com" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors">
            View Order Details
          </a>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <section className="bg-white border border-gray-200 rounded-lg p-6 mb-1">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-3 mb-4">
              Order Information
            </h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Order Number</dt>
                <dd className="text-sm font-medium text-gray-900">{orderNumber}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Order Date</dt>
                <dd className="text-sm font-medium text-gray-900">{orderDate}</dd>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 mt-3">
                <dt className="text-sm font-medium text-gray-900">Total Amount</dt>
                <dd className="text-sm font-bold text-gray-900">{orderTotal}</dd>
              </div>
            </dl>
          </section>

          <section className="bg-white border border-gray-200 rounded-lg p-6 mb-1">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-3 mb-4">
              Billing Information
            </h3>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">{billingAddress.name}</p>
              <p className="text-sm text-gray-600">{billingAddress.street}</p>
              <p className="text-sm text-gray-600">
                {billingAddress.city}, {billingAddress.state} {billingAddress.zip}
              </p>
              <p className="text-sm text-gray-600">{billingAddress.country}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Customer ID: <span className="font-medium text-gray-900">ACME-2023</span>
              </p>
            </div>
          </section>
        </div>

        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Item</th>
                <th className="text-left py-2">Quantity</th>
                <th className="text-left py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={`order-item-${index}`} className="border-b">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">{item.quantity}</td>
                  <td className="py-4">
                    {item.discountedPrice ? (
                      <>
                        <p className="line-through text-gray-500">{item.price}</p>
                        <p className="font-bold">{item.discountedPrice}</p>
                      </>
                    ) : (
                      <p>{item.price}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <Footer className="mt-6 text-center max-w-md mx-auto">
          <p className="text-sm text-gray-600">
            For any additional information or assistance, please don't hesitate to reach out to our dedicated account management team.
          </p>
        </Footer>
      </Page>
    </Document>
  )
}

Receipt.PreviewProps = {
  orderNumber: "CS-2023-05678",
  orderDate: "May 15, 2023",
  orderTotal: "$1,499.00",
  customerName: "Acme Corporation",
  billingAddress: {
    name: "Acme Corporation",
    street: "123 Business Ave, Suite 500",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States"
  },
  items: [
    {
      name: "CloudStack Enterprise Plan - Annual Subscription",
      description: "Includes unlimited users, 24/7 support, and advanced analytics",
      quantity: 1,
      price: "$1,499.00",
      discountedPrice: null,
      image: "/static/placeholder.svg?height=100&width=100"
    },
    {
      name: "Custom Integration Package",
      description: "10 hours of custom API integration support",
      quantity: 1,
      price: "$500.00",
      discountedPrice: "$400.00",
      image: "/static/placeholder.svg?height=100&width=100"
    }
  ]
};

Receipt.documentId = "receipt";

export default Receipt;
