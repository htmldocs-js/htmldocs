import { Document, Head, Page, Spacer } from "@htmldocs/react";
import clsx from "clsx";
import { createIntl, createIntlCache } from "@formatjs/intl";
import "~/index.css";

const cache = createIntlCache();

const intl = createIntl(
  {
    locale: "en-US",
    messages: {},
  },
  cache
);

const tableHeaderStyle =
  "text-sm font-medium text-gray-900 py-2 whitespace-nowrap";

function App() {
  return (
    <Document size="A4" orientation="portrait" margin="0.5in">
      <Head>
        <title>Invoice</title>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <style>
          {`
            :root {
              font-family: Inter, sans-serif;
              font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
            }
            @supports (font-variation-settings: normal) {
              :root { font-family: InterVariable, sans-serif; }
            }
          `}
        </style>
      </Head>
      <Page className="flex flex-col justify-between">
        <div id="invoice_body">
          <div
            id="document_header"
            className="flex flex-row items-center justify-between"
          >
            <div id="header_left" className="flex flex-col">
              <h1 className="uppercase text-4xl font-medium">Invoice</h1>
              <p className="text-gray-500">#AB2324-01</p>
            </div>
            <div id="header_right">
              <img src="../static/logo.svg" alt="Company Logo" />
            </div>
          </div>
          <Spacer height={48} />
          <div className="flex flex-row justify-between border-y border-gray-300 divide-x divide-gray-300">
            <div className="flex-1 flex flex-col justify-between p-4 pl-0">
              <div>
                <h2 className="text-sm font-medium">Issued</h2>
                <p className="text-sm text-gray-500 font-medium">
                  01 Aug, 2023
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium mt-2">Due</h2>
                <p className="text-sm text-gray-500 font-medium">
                  15 Aug, 2023
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col p-4">
              <h2 className="text-sm font-medium">Billed To</h2>
              <p className="text-sm text-gray-500 font-medium">John Doe</p>
              <p className="text-sm text-gray-500">123 Apple St.</p>
              <p className="text-sm text-gray-500">New York, NY 10001</p>
              <p className="text-sm text-gray-500">+0 (000) 123-4567</p>
            </div>
            <div className="flex-1 flex flex-col p-4 pr-0">
              <h2 className="text-sm font-medium">From</h2>
              <p className="text-sm text-gray-500 font-semibold">
                Your Company
              </p>
              <p className="text-sm text-gray-500">456 Banana Rd.</p>
              <p className="text-sm text-gray-500">San Francisco, CA 94107</p>
              <p className="text-sm text-gray-500">TAX ID 00XXXXX1234X0XX</p>
            </div>
          </div>
          <Spacer height={32} />
          <div className="flex flex-col mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className={clsx(tableHeaderStyle, "text-left")}
                    >
                      Service
                    </th>
                    <th
                      scope="col"
                      className={clsx(tableHeaderStyle, "pr-16 text-right")}
                    >
                      Qty
                    </th>
                    <th
                      scope="col"
                      className={clsx(tableHeaderStyle, "text-right")}
                    >
                      Rate
                    </th>
                    <th
                      scope="col"
                      className={clsx(tableHeaderStyle, "pl-16 text-right")}
                    >
                      Line total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <TableRow
                    service={{ name: "Design", description: "Description" }}
                    quantity={1}
                    rate={1000}
                  />
                  <TableRow
                    service={{
                      name: "Development",
                      description: "Description",
                    }}
                    quantity={2}
                    rate={1500}
                  />
                  <tr className="border-b"></tr>
                  <tr className="h-12">
                    <td className="w-full"></td>
                    <td className="text-left font-medium text-sm whitespace-nowrap border-b">
                      Subtotal
                    </td>
                    <td className="border-b"></td>
                    <td className="text-right text-sm text-gray-900 whitespace-nowrap border-b">
                      {intl.formatNumber(2500, {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                  </tr>
                  <tr className="h-12">
                    <td className="w-full"></td>
                    <td className="text-left font-medium text-sm whitespace-nowrap border-b">
                      Tax (0%)
                    </td>
                    <td className="border-b"></td>
                    <td className="text-right text-sm text-gray-900 whitespace-nowrap border-b">
                      {intl.formatNumber(0, {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                  </tr>
                  <tr className="h-12">
                    <td className="w-full"></td>
                    <td className="text-left font-medium text-sm whitespace-nowrap border-b">
                      Total
                    </td>
                    <td className="border-b"></td>
                    <td className="text-right text-sm text-gray-900 whitespace-nowrap border-b">
                      {intl.formatNumber(400, {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                  </tr>
                  <tr className="h-12 text-purple-700">
                    <td className="w-full"></td>
                    <td className="text-left font-medium text-sm whitespace-nowrap border-y-2 border-purple-700">
                      Amount due
                    </td>
                    <td className="border-y-2 border-purple-700"></td>
                    <td className="text-right font-medium text-sm whitespace-nowrap border-y-2 border-purple-700">
                      {intl.formatNumber(400, {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div id="footer">
          <div className="flex flex-col pb-4 border-b">
            <p className="text-sm font-medium">Thank you for your business!</p>
            <p className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 0C0.895431 0 0 0.89543 0 2V8C0 9.10457 0.89543 10 2 10H8C9.10457 10 10 9.10457 10 8V2C10 0.895431 9.10457 0 8 0H2ZM4.72221 2.95508C4.72221 2.7825 4.58145 2.64014 4.41071 2.66555C3.33092 2.82592 2.5 3.80797 2.5 4.99549V7.01758C2.5 7.19016 2.63992 7.33008 2.8125 7.33008H4.40971C4.58229 7.33008 4.72221 7.19016 4.72221 7.01758V5.6021C4.72221 5.42952 4.58229 5.2896 4.40971 5.2896H3.61115V4.95345C3.61115 4.41687 3.95035 3.96422 4.41422 3.82285C4.57924 3.77249 4.72221 3.63715 4.72221 3.4645V2.95508ZM7.5 2.95508C7.5 2.7825 7.35924 2.64014 7.18849 2.66555C6.1087 2.82592 5.27779 3.80797 5.27779 4.99549V7.01758C5.27779 7.19016 5.41771 7.33008 5.59029 7.33008H7.1875C7.36008 7.33008 7.5 7.19016 7.5 7.01758V5.6021C7.5 5.42952 7.36008 5.2896 7.1875 5.2896H6.38885V4.95345C6.38885 4.41695 6.72813 3.96422 7.19193 3.82285C7.35703 3.77249 7.5 3.63715 7.5 3.4645V2.95508Z"
                  fill="#8B919E"
                />
              </svg>
              <span className="text-sm text-gray-500">
                Please pay within 15 days of receiving this invoice.
              </span>
            </p>
          </div>
          <Spacer height={36} />
          <div className="flex justify-between text-sm text-gray-500">
            Digital product designer, IN
            <div className="flex items-center gap-8">
              <p className="text-sm">+91 00000 00000</p>
              <p className="text-sm">hello@email.com</p>
            </div>
          </div>
        </div>
      </Page>
      <Page>
        qoiwehfqoweihfqoiwe
      </Page>
    </Document>
  );
}

interface Service {
  name: string;
  description?: string;
}

interface TableRowProps {
  service: Service;
  quantity: number;
  rate: number;
}

const TableRow = ({ service, quantity, rate }: TableRowProps) => {
  const total = quantity * rate;
  const cellStyle = "text-sm text-gray-900 font-light py-4 whitespace-nowrap";
  const detailStyle =
    "whitespace-nowrap align-top overflow-hidden overflow-ellipsis";

  return (
    <tr>
      <td className={clsx(cellStyle, "w-full")}>
        <div className="flex flex-col gap-1">
          <span className="font-medium">{service.name}</span>
          <span className="text-gray-500">{service.description}</span>
        </div>
      </td>
      <td className={clsx(cellStyle, detailStyle, "text-left")}>{quantity}</td>
      <td className={clsx(cellStyle, detailStyle, "text-right")}>
        {intl.formatNumber(rate, { style: "currency", currency: "USD" })}
      </td>
      <td className={clsx(cellStyle, detailStyle, "text-right")}>
        {intl.formatNumber(total, { style: "currency", currency: "USD" })}
      </td>
    </tr>
  );
};

export default App;

export interface ComponentProps_aef47f16 {
}
