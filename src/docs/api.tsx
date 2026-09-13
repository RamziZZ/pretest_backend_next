"use client";

import { useState } from "react";

type Endpoint = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  request?: object;
  response?: object;
};

const endpoints: Endpoint[] = [
  {
    method: "GET",
    path: "/api/products",
    description: "Mengambil semua product",
    response: {
      id: 1,
      name: "Beras 5kg",
      price: "75000",
      stock: 10,
      createdAt: "2026-09-13T16:01:58.654Z",
      updatedAt: "2026-09-13T16:01:58.654Z",
    },
  },
  {
    method: "GET",
    path: "/api/products/:id",
    description: "Mengambil satu product berdasarkan ID",
    response: {
      id: 1,
      name: "Beras 5kg",
      price: "75000",
      stock: 10,
    },
  },
  {
    method: "POST",
    path: "/api/products",
    description: "Membuat product baru",
    request: {
      name: "Beras 5kg",
      price: 75000,
      stock: 10,
    },
    response: {
      id: 1,
      name: "Beras 5kg",
      price: "75000",
      stock: 10,
    },
  },
  {
    method: "PUT",
    path: "/api/products/:id",
    description: "Mengupdate product berdasarkan ID",
    request: {
      name: "Beras Premium 5kg",
      price: 85000,
      stock: 20,
    },
    response: {
      id: 1,
      name: "Beras Premium 5kg",
      price: "85000",
      stock: 20,
    },
  },
  {
    method: "DELETE",
    path: "/api/products/:id",
    description: "Menghapus product berdasarkan ID",
    response: {
      message: "Product berhasil dihapus",
    },
  },
];

const methodStyle = {
  GET: "bg-green-100 text-green-700",
  POST: "bg-blue-100 text-blue-700",
  PUT: "bg-yellow-100 text-yellow-700",
  DELETE: "bg-red-100 text-red-700",
};

function JsonBlock({ data }: { data: object }) {
  const [copied, setCopied] = useState(false);

  const json = JSON.stringify(data, null, 2);

  const copyJson = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="relative mt-3 overflow-hidden rounded-xl bg-slate-950">
      <button
        onClick={copyJson}
        className="absolute right-3 top-3 rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-white hover:bg-slate-700"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <pre className="overflow-x-auto p-5 text-sm leading-6 text-slate-200">
        <code>{json}</code>
      </pre>
    </div>
  );
}

export default function ApiDocsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <header className="mb-10">
          <div className="mb-2 text-sm font-semibold text-indigo-600">
            API DOCUMENTATION
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Project Backend API
          </h1>

          <p className="mt-3 text-slate-500">
            REST API menggunakan Next.js, Prisma, dan MySQL.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
              Next.js
            </span>

            <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs text-white">
              Prisma
            </span>

            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs text-white">
              MySQL
            </span>
          </div>
        </header>

        {/* BASE URL */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold">
            Base URL
          </div>

          <div className="mt-2 rounded-lg bg-slate-100 px-4 py-3 font-mono text-sm">
            http://localhost:3000
          </div>
        </section>

        {/* PRODUCT */}
        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">
              Products
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Endpoint untuk mengelola data product.
            </p>
          </div>

          <div className="space-y-3">
            {endpoints.map((endpoint, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={`${endpoint.method}-${endpoint.path}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* ENDPOINT HEADER */}
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-slate-50"
                  >
                    <span
                      className={`min-w-20 rounded-lg px-3 py-1.5 text-center text-xs font-bold ${
                        methodStyle[endpoint.method]
                      }`}
                    >
                      {endpoint.method}
                    </span>

                    <span className="font-mono text-sm font-semibold">
                      {endpoint.path}
                    </span>

                    <span className="ml-auto text-slate-400">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* DETAIL */}
                  {isOpen && (
                    <div className="border-t border-slate-200 px-5 py-6">

                      <p className="text-sm text-slate-600">
                        {endpoint.description}
                      </p>

                      {/* REQUEST */}
                      {endpoint.request && (
                        <div className="mt-6">
                          <h3 className="text-sm font-bold">
                            Request Body
                          </h3>

                          <JsonBlock data={endpoint.request} />
                        </div>
                      )}

                      {/* RESPONSE */}
                      {endpoint.response && (
                        <div className="mt-6">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold">
                              Response
                            </h3>

                            <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                              200
                            </span>
                          </div>

                          <JsonBlock data={endpoint.response} />
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-400">
          Project Backend API Documentation
        </footer>

      </div>
    </main>
  );
}