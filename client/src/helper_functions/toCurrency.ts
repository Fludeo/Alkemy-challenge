export  function USDConverter(amount:number){
    const result = Intl.NumberFormat('en-US', {
        currencyDisplay: 'symbol',
        style: 'currency',
        currency: 'USD'
      }).format(amount)
return result;
}
