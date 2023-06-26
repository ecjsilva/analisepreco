import "./style.css";
import { useState } from "react";
import tupanl from "./assets/tupan.png";
import venezal from "./assets/veneza.gif";
import armazemc from "./assets/armazemc.png";
import cazanova from "./assets/cazanova.png";
import cbatista from "./assets/cbatista.png";
import Loading from "./components/Loading";

function App() {
  const [tupanp, setTupanp] = useState([]);
  const [venezap, setVenezap] = useState([]);
  const [armazemcp, setArmazemcp] = useState([]);
  const [cazanovap, setCazanovap] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(true);
  const handleChange = (e) => {
    e.preventDefault();
    setRemoveLoading(false);
    let pesq = e.target.elements.seach.value;
    fetch(`http://192.168.1.212:3001/product/${pesq}`)
      .then((res) => res.json())
      .then((data) => {
        setTupanp(data);
        setRemoveLoading(true);
      });
    fetch(`http://192.168.1.212:3001/productvz/${pesq}`)
      .then((res) => res.json())
      .then((data) => {
        setVenezap(data);
        setRemoveLoading(true);
      });
    fetch(`http://192.168.1.212:3001/productac/${pesq}`)
      .then((res) => res.json())
      .then((data) => {
        setArmazemcp(data);
        setRemoveLoading(true);
      });
    fetch(`http://192.168.1.212:3001/productcz/${pesq}`)
      .then((res) => res.json())
      .then((data) => {
        setCazanovap(data);
        setRemoveLoading(true);
      });
  };

  return (
    <>
      <div className="container">
        <img src={cbatista} alt="logobastista" id="cbatista" />
        <h1>ANÁLISE DE PREÇO DA CONCORRÊNCIA</h1>
        <div className="search">
          <form onSubmit={handleChange}>
            <label htmlFor="seach"></label>
            <input
              type="text"
              name="seach"
              placeholder="Digite o nome do produto"
            />
            <button type="submit">Buscar</button>
          </form>
        </div>
      </div>
      <div className="container-concorrentes">
        <div className="concorrente">
          <img src={tupanl} alt="tupan-logo" />
          {tupanp.map((tupanp) => {
            return (
              <>
                <a href={tupanp.href} target="_blank" rel="noreferrer">
                  <div className="price-card">
                    <div className="price-card2">
                      <div className="description" key={tupanp.descripition}>
                        {tupanp.descripition.toUpperCase()}
                      </div>

                      <div className="price">{tupanp.price.toUpperCase()}</div>
                    </div>
                  </div>
                </a>
              </>
            );
          })}
          {!removeLoading && <Loading />}
        </div>
        <div className="concorrente">
          <img src={venezal} alt="veneza-logo" />
          {venezap.map((venezap) => {
            return (
              <>
                <a href={venezap.href} target="_blank" rel="noreferrer">
                  <div className="price-card">
                    <div className="price-card2">
                      <div className="description" key={venezap.descripition}>
                        {venezap.descripition.toUpperCase()}
                      </div>
                      <div className="price">
                        {venezap.price.slice(0, 7)}
                        {venezap.specialprice}
                      </div>
                    </div>
                  </div>
                </a>
              </>
            );
          })}
          {!removeLoading && <Loading />}
        </div>
        <div className="concorrente">
          <img src={armazemc} alt="armazemcoral-logo" />
          {armazemcp.map((armazemcp) => {
            return (
              <>
                <a href={armazemcp.href} target="_blank" rel="noreferrer">
                  <div className="price-card">
                    <div className="price-card2">
                      <div className="description" key={armazemcp.descripition}>
                        {armazemcp.descripition.toUpperCase()}
                      </div>

                      <div className="price">
                        {armazemcp.price.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </a>
              </>
            );
          })}
          {!removeLoading && <Loading />}
        </div>
        <div className="concorrente">
          <img src={cazanova} alt="cazanova-logo" />
          {cazanovap.map((cazanovap) => {
            return (
              <>
                <a href={cazanovap.href} target="_blank" rel="noreferrer">
                  <div className="price-card">
                    <div className="price-card2">
                      <div className="description" key={cazanovap.descripition}>
                        {cazanovap.descripition.toUpperCase()}
                      </div>

                      <div className="price">{cazanovap.pricet}</div>
                    </div>
                  </div>
                </a>
              </>
            );
          })}
          {!removeLoading && <Loading />}
        </div>
      </div>
    </>
  );
}

export default App;
