import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE
});

export async function placeOrder(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN ISOLATION LEVEL SERIALIZABLE');

    const orderDetails = req.body.orderItems; 

    for (const item of orderDetails) {
      const updateStockQuery = 'UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1';
      const result = await client.query(updateStockQuery, [item.quantity, item.productId]);

      if (result.rowCount === 0) {
        throw new Error('Insufficient stock or product not found');
      }
    }

    const insertOrderQuery = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING id';
    const orderResult = await client.query(insertOrderQuery, [req.user.id, 'Pending']);
    const orderId = orderResult.rows[0].id;

    for (const item of orderDetails) {
      const insertItemQuery = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)';
      await client.query(insertItemQuery, [orderId, item.productId, item.quantity, item.price]);
    }

    await client.query('COMMIT');
    res.status(201).send({ message: 'Order placed successfully', orderId });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(400).send({ error: error.message });
  } finally {
    client.release();
  }
}
