import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data product",
      },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, price, stock } = body;

    // Validasi
    if (!name || price === undefined) {
      return NextResponse.json(
        {
          message: "Name dan price wajib diisi",
        },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: String(name),
        price: Number(price),
        stock: Number(stock ?? 0),
      },
    });

    return NextResponse.json(product, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal membuat product",
      },
      { status: 500 }
    );
  }
}

