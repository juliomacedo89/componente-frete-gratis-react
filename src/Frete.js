import React, { useState, useEffect } from 'react' 
import axios from 'axios' 
import ProgressBar from 'react-percent-bar'


function Frete() {
  
  
  const [fretePercent, setFretePercent] = useState(0);
  const [valorFreteForFree, setValorFreteForFree]= useState(0);
 

  useEffect(() => { 
    axios.get(`https://open.er-api.com/v6/latest/USD`)
    .then(res => {
      
      let valueCart = res.data.rates.AFN

      
      let percentValueCart = ((valueCart * 100) / 150)
      let valorFreteComplet = (150 - valueCart).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
      
      
      setFretePercent(percentValueCart)
      setValorFreteForFree(valorFreteComplet)
      
    })
  }); 
 

  return (
    <div class="frete__container"> 
      
      {fretePercent < 100 && ( 
        <> 
          <span className="frete__title">Faltam apenas {valorFreteForFree} para ganhar frete grátis</span>
          <ProgressBar colorShift={true} fillColor="green" percent={fretePercent} />
        </> 
      )}

      {fretePercent >= 100 && ( 
        <> 
          <span className="frete__title">  🎉 Parabéns! Você ganhou frete grátis!</span>
          <ProgressBar colorShift={true} fillColor="blue" percent={100} />
        </> 
      )}

    </div>
  );
};

export default Frete
