import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import * as ExternalApi from "./api/api.js";
var address = "0x921db87f8e0a889e8f1c245ebae96b179be12605";
var token = "U2FsdGVkX1/gbFPx27PaO3n8LhUAaVV/G0uN+ujhiqQ=";
var user_phone = "0900000000";
var amount = 0;
var party_phone = "";

function App() {
  const [carbonPoint, setCarbonPoint] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [addpoint,setAddpoint] = useState("");
  // const [tempPointResult, setTempPointResult] = useState("");
  useEffect(
    function () {
      getCurrentPoints();
      // getTempPointsRecord();
    },
    [userAddress]
  );

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
      // alert(userPhone);
      const result = await ExternalApi.getExtrnalConsumer(userPhone);
      console.log("Debug: getExtrnalConsumer=", result.message, address);
      setUserAddress(result.message.address);
      setCarbonPoint(0);
    } catch (error) {
      console.log("Error: getExtrnalConsumer=", error);
    }
  };

  const setAmountToinput = async () => {
    try {
      // alert(userPhone);
      // const result = await ExternalApi.getExtrnalConsumer(userPhone);
      // console.log("Debug: getExtrnalConsumer=", result.message, address);
      // setUserAddress(result.message.address);
      // setCarbonPoint(0);
      alert(addpoint);
      amount = parseFloat(addpoint); // 將字串轉換為浮點數
      console.log(amount);
    } catch (error) {
      console.log("Error: amount", error);
    }
  };
  // const getTotalAmount = () => {
  //   if (tempPointResult && tempPointResult.length > 0) {
  //     return tempPointResult.reduce(
  //       (total, record) => total + record.amount,
  //       0
  //     );
  //   }
  //   return 0;
  // };
  // const getTempPointsRecord = async () => {
  //   try {
  //     const tempPointResults = await ExternalApi.getTempPointsRecord();
  //     if (tempPointResults.code === 200) {
  //       var resultArr = tempPointResults.message;
  //       console.log("Debug: getTempPointsRecord=", resultArr);
  //       resultArr.forEach((element) => {
  //         var tmp = new Date(element.timestamp);
  //         element.timestamp = tmp.toLocaleString();
  //       });
  //       // resultArr = resultArr.sort((a, b) => b.timestamp - a.timestamp);
  //       resultArr.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  //       console.log("Debug: getTempPointsRecord=", resultArr);
  //       setTempPointResult(resultArr);
  //     } else {
  //       throw new Error(tempPointResults.message);
  //     }
  //   } catch (e) {
  //     console.log("Debug: getTempPointsRecord error=", e.message);
  //     return;
  //   }
  // };
  const transferFrom = async () => {
    try {
      alert("碳權點數轉移中，請稍候");
      const result = await ExternalApi.transferFrom(
        token,
        userPhone,
        amount,
        party_phone
      );
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

  const handlePointsChange = (event) => {
    const inputAmount = event.target.value;
    setAddpoint(inputAmount);
    try {
      amount = parseFloat(inputAmount); // 將字串轉換為浮點數
      console.log(amount);
    } catch (error) {
      console.log("Error: amount", error);
    }
  };

  const ecpay = async () => {
    try {
       
      // 在這裡添加跳轉至 localhost:3000 的程式碼
      window.location.href = "http://localhost:3002"; // 更換成您需要的 URL
  
    } catch (error) {
      console.log("Error: redirect=", error);
    }
  };

return (
  <div className="App container mt-5">
    <h1 className="mb-4">台銀模擬應用</h1>
    <table className="table">
      <tbody>
        <tr>
          <td class="key">台銀於碳權平台申請之token：</td>
          <td class="value">{token}</td>
        </tr>
        <p></p>
        <tr> 
          <td></td>
          <td class="value">⇩ 以下為使用者資訊 ⇩ </td>
        </tr>
        <tr>
          <td class="key">手機：</td>
          <td class="value">
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
          <td class="key">你的地址是：</td>
          <td class="value">{userAddress}</td>
        </tr>
        <tr>
          <td class="key">新增的點數：</td>
          <td class="value">
            <input
              type="text"
              className="form-control"
              placeholder="請輸入要新增的點數"
              value={addpoint}
              onChange={handlePointsChange}
            />
            <button className="btn btn-primary" onClick={transferFrom}>
              付款
            </button>
            {/* <button className="btn btn-primary" onClick={ecpay} style={{ marginLeft: '10px' }}>
              綠界支付
            </button> */}
          </td>
        </tr>
        <tr>
          <td class="key">目前擁有的碳權點數：</td>
          <td class="value">{carbonPoint ? carbonPoint : 0} 點</td>
        </tr>
      </tbody>
    </table>
    {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button className="btn btn-primary" onClick={ecpay}>
        綠界付款
      </button>
    </div> */}
  </div>
    
);
}

export default App;
