// Home.js
import React, { useState, useEffect } from "react";
import * as ExternalApi from "../api/api.js";
import "../App.css";
import styles from "../App.css";
import { address_enterprise,address, token, party_phone } from '../global_variable.js';

const Home = () => {
    const [carbonPoint, setCarbonPoint] = useState(0);
    const [userPhone, setUserPhone] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [addpoint, setAddpoint] = useState("");
    const [amount, setAmount] = useState(0);
  const [partyPhone, setPartyPhone] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenOptions, setTokenOptions] = useState([]); // Initialize as an empty array
  
    useEffect(() => {
      getCurrentPoints();
      //let [tokens  , setTokens] = useState([]); // Initialize as an empty array

    fetchTokenIds(); // Fetch token IDs when the component mounts
    }, [userAddress],[]);
  
    const getCurrentPoints = async () => {
      try {
        if (userAddress) {
          const result = await ExternalApi.getCurrentPoints(userAddress, token);
          console.log("Debug: getCurrentPoints=", result.message);
          setCarbonPoint(result.message);
        }
      } catch (error) {
        console.log("Error: getCurrentPoints=", error);
      }
    };
  
    const getExtrnalConsumer = async () => {
      try {
        const result = await ExternalApi.getExtrnalConsumer(userPhone);
        console.log("Debug: getExtrnalConsumer=", result.message, address);
        setUserAddress(result.message.address);
          // setCarbonPoint(0);
          getCurrentPoints();
      } catch (error) {
        console.log("Error: getExtrnalConsumer=", error);
      }
    };

    const fetchTokenIds = async () => {
      try {
        const response = await ExternalApi.getCurrentPointsDetail(address_enterprise, token);
        if (response.code !== 200) {
          alert("請帶入有效的address以及token");
          return;
        }
        var tokens = response.message.tokenIds;
        
        console.log("Debug: fetchTokenIds tokens=", tokens); // Debug log
        if (!Array.isArray(tokens)) {
          tokens = tokens.replace(/[\[\]]/g, '').split(',');
        }
        //setTokenOptions([0, 1, 2, 3]);
        setTokenOptions(tokens);
        console.log("Debug: tokenOptions=", tokenOptions); // Debug log
      } catch (error) {
        console.log("Error: fetchTokenIds=", error);
      }
    };
  
    const transferFrom = async () => {
      try {
        alert("碳權點數轉移中，請稍候");
        const result = await ExternalApi.transferFrom(token, userPhone, amount, party_phone,tokenId);
        console.log("Debug: transferFrom=", result.message);
        getCurrentPoints();
          console.log(amount);
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
  
  const handleTokenIdChange = (event) => {
    setTokenId(event.target.value);
  };
  
    const handlePointsChange = (event) => {
      const inputAmount = event.target.value;
      setAddpoint(inputAmount);
      try {
        setAmount(parseFloat(inputAmount)); // 將字串轉換為浮點數
        console.log(parseFloat(inputAmount));
      } catch (error) {
        console.log("Error: amount", error);
      }
    };
  
    const handlePartyPhoneChange = (event) => {
      setPartyPhone(event.target.value);
    };
  
    const ecpay = async () => {
      try {
        window.location.href = "http://localhost:3002"; // 更換成您需要的 URL
      } catch (error) {
        console.log("Error: redirect=", error);
      }
    };
  
    return (
      <div className="App">
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
                  placeholder="請輸入使用者手機號碼"
                  value={userPhone}
                  onChange={handlePhoneChange}
                />
                <button className="btn btn-primary" onClick={getExtrnalConsumer}>更新</button>
              </td>
            </tr>
            <tr>
              <td className="key">消費者的地址是：</td>
              <td className="value">{userAddress}</td>
            </tr>
            <tr>
              <td className="key">新增的點數：</td>
              <td className="value">
                <input
                  type="text"
                  className="form-control"
                  placeholder="請輸入要新增的點數"
                  value={addpoint}
                  onChange={handlePointsChange}
                />
                 <td className={styles.selectBox}>
                <select
          className="form-control"
          value={tokenId}
          onChange={handleTokenIdChange}
        >
          <option value="">請選擇Token ID</option>
          {Array.isArray(tokenOptions) && tokenOptions.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select></td>
                <button className="btn btn-primary" onClick={transferFrom}>
                  轉移點數
                </button>
              </td>
            </tr>
            <tr>
              <td className="key">目前擁有的碳權點數：</td>
              <td className="value">{carbonPoint ? carbonPoint : 0} 點</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Home;