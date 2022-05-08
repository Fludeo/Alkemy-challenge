export  function USDConverter(amount:number){
  console.log(amount)
    const result = Intl.NumberFormat('en-US', {
        currencyDisplay: 'symbol',
        style: 'currency',
        currency: 'USD'
      }).format(amount)
return result;
}