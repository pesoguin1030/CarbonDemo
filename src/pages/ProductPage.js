import React from "react";
import styles from "../ProductPage.module.css";

const ProductPage = () => {
  const calculateTotal = () => {
    const prices = [90, 90, 90, 95, 95, 100, 95, 100, 100, 95, 110, 110, 115, 95, 125, 125];
    let total = 0;
    const quantities = document.getElementsByClassName(styles.input);
    for (let i = 0; i < quantities.length; i++) {
      total += quantities[i].value * prices[i];
    }
    document.getElementById('totalAmount').innerText = total;
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>商品清單</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>商品名稱</th>
            <th className={styles.th}>單價 (NTD)</th>
            <th className={styles.th}>數量</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["精典池上飯包", 90],
            ["古早味排骨飯包", 90],
            ["唐揚炸雞飯包", 90],
            ["阿里山烤雞飯包", 95],
            ["松阪雞飯包", 95],
            ["蒲燒鯛魚飯包", 100],
            ["薄鹽鯖魚飯包", 95],
            ["控肉飯包", 100],
            ["土雞肉飯", 100],
            ["養生飯包", 95],
            ["雞排飯包", 110],
            ["黃金豬排飯包", 110],
            ["鐵道排骨飯包", 115],
            ["飄香滷雞腿飯包", 95],
            ["香酥雞腿飯包", 125],
            ["海陸雙拼飯包", 125],
          ].map((item, index) => (
            <tr key={index}>
              <td className={styles.td}>{item[0]}</td>
              <td className={styles.td}>{item[1]}</td>
              <td className={styles.td}>
                <input
                  type="number"
                  className={styles.input}
                  onInput={calculateTotal}
                  defaultValue="0"
                  min="0"
                />
              </td>
            </tr>
          ))}
          <tr className={`${styles.total} ${styles.total_row}`}>
            <td colSpan="2">總金額</td>
            <td id="totalAmount" className={styles.total_amount}>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;
