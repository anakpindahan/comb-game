export function gcd(a, b){
  return (a === 0 ? b : (b === 0 ? a : gcd (b, a % b)))
}

export function getFactors(n){
  const factors = []
  for(let i = 1; i <= n; i++){
    if(n % i === 0){
      factors.push(i)
    }
  }
  return factors
}

export function isPrimeOrOne(n){
  for(let i = 2; i <= Math.floor(Math.sqrt(n)); i++){
    if((n % i === 0)){
      return false
    }
  }
  return true
}

export function sumOfDigits(n){
  let s = 0
  while(n){
    s += (n % 10)
    n -= (n % 10)
    n /= 10
  }
  return s
}