import React, { useState, useEffect } from "react";
import * as ExternalApi from "../api/api.js";
import styles from "../ProductPage.module.css";
import { address, token, user_phone, party_phone } from '../global_variable.js';

const ProductPage = () => {
  const [carbonPoint, setCarbonPoint] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [partyPhone, setPartyPhone] = useState("");

  useEffect(() => {
    if (userAddress) {
      getCurrentPoints();
    }
  }, [userAddress]);

  const calculateTotal = () => {
    const prices = [90, 90, 90, 95, 95, 100, 95, 100, 100, 95, 110, 110, 115, 95, 125, 125];
    let total = 0;
    const quantities = document.getElementsByClassName(styles.input);
    for (let i = 0; i < quantities.length; i++) {
      total += quantities[i].value * prices[i];
    }
    setTotalAmount(total);
  };

  const getCurrentPoints = async () => {
    try {
      const result = await ExternalApi.getCurrentPoints(userAddress, token);
      console.log("Debug: getCurrentPoints=", result.message);
      setCarbonPoint(result.message);
    } catch (error) {
      console.log("Error: getCurrentPoints=", error);
    }
  };

  const getExtrnalConsumer = async () => {
    try {
      const result = await ExternalApi.getExtrnalConsumer(userPhone);
      console.log("Debug: getExtrnalConsumer=", result.message);
      if (result.message && result.message.address) {
        setUserAddress(result.message.address);
        setCarbonPoint(0); // Reset carbon point to 0 when user address changes
      } else {
        console.error("Error: Invalid address received from API");
      }
    } catch (error) {
      console.log("Error: getExtrnalConsumer=", error);
    }
  };

  const transferFrom = async () => {
    try {
        const amount = Math.floor(totalAmount * 0.1); // 轉出的點數是總金額的10%
        console.log(amount)
      alert("碳權點數轉移中，請稍候");
      const result = await ExternalApi.transferFrom(token, userPhone, amount, party_phone);
      console.log("Debug: transferFrom=", result.message);
      getCurrentPoints();
      if (result.message === "Successfully transfer carbon points") {
        alert("您已成功取得碳權點數！");
      } else {
        alert("碳權點數將轉為暫存點數");
      }
    } catch (error) {
      console.log("Error: transferFrom=", error);
    }
  };

  const handlePhoneChange = (event) => {
    setUserPhone(event.target.value);
  };

  const handlePartyPhoneChange = (event) => {
    setPartyPhone(event.target.value);
  };

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">便當店模擬應用</h1>
      <table className="table">
        <tbody>
          <tr>
            <td className="key">便當店於碳權平台申請之token：</td>
            <td className="value">{token}</td>
          </tr>
          <tr> 
            <td></td>
            <td className="value">⇩ 以下為使用者資訊 ⇩ </td>
          </tr>
          <tr>
            <td className="key">手機：</td>
            <td className="value">
              <input
                type="text"
                className="form-control"
                placeholder="請輸入使用者手機號"
                value={userPhone}
                onChange={handlePhoneChange}
              />
              <button onClick={getExtrnalConsumer}>更新</button>
            </td>
          </tr>
          <tr>
            <td className="key">你的地址是：</td>
            <td className="value">{userAddress}</td>
          </tr>
          <tr>
            <td className="key">目前擁有的碳權點數：</td>
            <td className="value">{carbonPoint ? carbonPoint : 0} 點</td>
          </tr>
        </tbody>
      </table>
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
          <tr className={`${styles.total} ${styles.totalRow}`}>
            <td colSpan="2">總金額</td>
            <td id="totalAmount" className={styles.totalAmount}>{totalAmount}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <h4>轉移點數給另一位用戶</h4>
        <input
          type="text"
          className="form-control"
          placeholder="請輸入接收者手機號"
          value={partyPhone}
          onChange={handlePartyPhoneChange}
        />
        <button className="btn btn-primary mt-2" onClick={transferFrom}>
          轉移 {Math.floor(totalAmount * 0.1)} 點 碳權點數
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
