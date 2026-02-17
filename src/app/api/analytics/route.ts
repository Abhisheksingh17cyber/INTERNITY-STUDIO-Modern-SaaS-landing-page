import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Customer from '@/models/Customer';
import Product from '@/models/Product';

export async function GET() {
  try {
    await dbConnect();

    const [
      totalOrders,
      totalCustomers,
      totalProducts,
      revenueAgg,
      recentOrders,
      ordersByStatus,
    ] = await Promise.all([
      Order.countDocuments(),
      Customer.countDocuments(),
      Product.countDocuments(),
      Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
      Order.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    return NextResponse.json({
      totalOrders,
      totalCustomers,
      totalProducts,
      totalRevenue,
      recentOrders,
      ordersByStatus: Object.fromEntries(
        ordersByStatus.map((s: { _id: string; count: number }) => [s._id, s.count])
      ),
    });
  } catch (error) {
    console.error('GET /api/analytics error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
