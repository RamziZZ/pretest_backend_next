import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/products/:id
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return NextResponse.json(
        {
          message: "ID tidak valid",
        },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "Product tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal mengambil product",
      },
      { status: 500 }
    );
  }
}

// PUT /api/products/:id
export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    // Validasi ID
    if (Number.isNaN(productId)) {
      return NextResponse.json(
        {
          message: "ID tidak valid",
        },
        { status: 400 }
      );
    }

    // Ambil body dari request
    const body = await request.json();

    const { name, price, stock } = body;

    // Update product
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...(name !== undefined && {
          name: String(name),
        }),

        ...(price !== undefined && {
          price: Number(price),
        }),

        ...(stock !== undefined && {
          stock: Number(stock),
        }),
      },
    });

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (error) {
    console.error("PUT PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        message: "Gagal mengupdate product",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/products/:id
export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return NextResponse.json(
        {
          message: "ID tidak valid",
        },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({
      message: "Product berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal menghapus product",
      },
      { status: 500 }
    );
  }
}