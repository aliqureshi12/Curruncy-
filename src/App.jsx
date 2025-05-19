// App.jsx
import { useState, useEffect } from 'react'
import './App.css'
import InputBox from './components/Inputbox'
import useCurrencyInfo from './hocks/currencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  useEffect(() => {
    if (currencyInfo[to]) {
      setExchangeRate(currencyInfo[to])
      setConvertedAmount(amount * currencyInfo[to])
    }
  }, [currencyInfo, to, amount])

  const swapCurrencies = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/41953/earth-blue-planet-globe-planet-41953.jpeg')" }}>
      <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-5 bg-white/30 backdrop-blur-sm">
        <form onSubmit={(e) => e.preventDefault()}>
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={Object.keys(currencyInfo)}
            selectedCurrency={from}
            onCurrencyChange={setFrom}
            onAmountChange={setAmount}
          />

          <div className="relative w-full h-0.5 my-4">
            <button
              type="button"
              onClick={swapCurrencies}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md"
            >
              SwapAliewrfw
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={Object.keys(currencyInfo)}
            selectedCurrency={to}
            onCurrencyChange={setTo}
            amountDisabled
          />

          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Exchange Rate: 1 {from.toUpperCase()} = {exchangeRate} {to.toUpperCase()}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
