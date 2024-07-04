import React, { useState, useEffect } from "react";
import * as ExternalApi from "../api/api.js";
import styles from "../OnlineShop.module.css";
import { address, token, user_phone, party_phone } from '../global_variable.js';

import {
    InputGroup,
    Form,
    FormGroup,
    Container, 
    Row,
    Col,
  } from "react-bootstrap";
  
const OnlineShop = () => {
  const [carbonPoint, setCarbonPoint] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [partyPhone, setPartyPhone] = useState("");
  const [tokenId, setTokenId] = useState("");

  useEffect(() => {
    if (userAddress) {
      getCurrentPoints();
    }
  }, [userAddress]);

  const calculateTotal = () => {
    const prices = [599, 240, 240, 1650, 275, 210, 150, 220, 190, 145];
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
      if (!userPhone) {
        alert("請輸入有效的手機號碼");
        return;
      }
      console.log(userPhone, amount, token)
      alert("碳權點數轉移中，請稍候");
      const tokenId = 23;
      const result = await ExternalApi.transferFrom(token, userPhone, amount, party_phone, tokenId);
      console.log("Debug: transferFrom=", result.message);
      getCurrentPoints();
      if (result.message === "Successfully transfer carbon points") {
        alert("您已成功取得碳權點數！");
        window.location.reload(); // Refresh the page after successful purchase
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
  const handleTokenIdChange = (event) => {
    setTokenId(event.target.value);
  };

  return (
    <div className="App container mt-5">
      <header className={styles.header}>
        <div className={styles.logo}>綠色環保商品線上商城</div>
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>首頁</a>
          <a href="#" className={styles.navLink}>好康特選</a>
          <a href="#" className={styles.navLink}>常溫食品</a>
          <a href="#" className={styles.navLink}>冷凍/蔬果</a>
          <a href="#" className={styles.navLink}>用品圖書</a>
          <a href="#" className={styles.navLink}>特別企劃</a>
          <a href="#" className={styles.navLink}>蔬食食譜</a>
          <a href="#" className={styles.navLink}>專題文章</a>
          <a href="#" className={styles.navLink}>認識我們</a>
        </nav>
      </header>
      <div className={styles.productGrid}>
        {[
          ["https://www.leezen.com.tw/uploads/product/product_coverPhoto_20230605094049_ecp_tw.jpg", "卡塔摩納阿里山精品濾泡", 599],
          ["https://www.leezen.com.tw/uploads/product/product_coverPhoto_20230209100812_6gc_tw.jpg", "卡塔摩納雨林聯盟認證濾泡 (小)", 240],
          ["https://www.leezen.com.tw/uploads/product/product_coverPhoto_20230209085158_0c1_tw.jpg", "卡塔摩納雨林聯盟認證濾泡 (大)", 240],
          ["https://www.leezen.com.tw/uploads/product/product_coverphoto_20191025172347_5d3_tw.jpg", "轉頭讀獨角獸六層紗防踢被", 1650],
          ["https://www.leezen.com.tw/uploads/product/product_coverPhoto_20190815110023_0fx_tw.jpg", "米森有機黑芝麻寶寶粥", 275],
          ["https://www.leezen.com.tw/uploads/product/product_coverPhoto_20190530105230_im6_tw.jpg", "歐特有機十穀米", 210],
          ["https://www.leezen.com.tw/uploads/product/product_coverPhoto_20190530105706_w64_tw.jpg", "歐特有機大燕麥片", 150],
            ["https://www.leezen.com.tw/uploads/product/product_coverPhoto_20190530105903_p5w_tw.jpg", "歐特有機黑豆 1KG", 220],
            ["https://www.leezen.com.tw/uploads/product/product_coverPhoto_20190530105522_ipw_tw.jpg", "歐特有機黃豆 1KG", 190],
          ["https://www.leezen.com.tw/uploads/product/product_coverPhoto_20190530105903_p5w_tw.jpg", "米森有機黑芝麻餅", 145],
          
        ].map((item, index) => (
          <div key={index} className={styles.productCard}>
            <img src={item[0]} alt={item[1]} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h5 className={styles.productName}>{item[1]}</h5>
              <p className={styles.productPrice}>價格: {item[2]} NTD</p>
              <input
                type="number"
                className={styles.input}
                onInput={calculateTotal}
                defaultValue="0"
                min="0"
              />
              <p className={styles.productPoints}>碳點數: {Math.floor(item[2] * 0.1)}</p>
            </div>
          </div>
        ))}
          </div>
      <Container className="mt-5">
  <Row>
    <Col >
      <div className={styles.summary}>
        <h3>總金額: {totalAmount} NTD</h3>
        <h3>可獲得碳點數: {Math.floor(totalAmount * 0.1)} 點</h3>
      </div>
                  </Col>
              </Row>
    <Row className="justify-content-center">          
                  <Col md={4}>
      <div className="mt-5">
        <h4>立即購買</h4>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="請輸入您的手機號碼"
            value={userPhone}
            onChange={handlePhoneChange}
          />
          <button variant="primary" className="btn btn-primary" onClick={transferFrom}>
            購買
          </button>
        </InputGroup>
      </div>
    </Col>
  </Row>
</Container>
    </div>
  );
};

export default OnlineShop;
