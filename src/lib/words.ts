import { WORDS } from '../constants/wordlist'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'

export const isWordInWordList = async (word: string) => {
  if (solution === word) {
    return true
  }
  console.log("checking " + word);
  let registered = await isRegistered(word);
  console.log("registered: " + registered)
  return registered;

}

export const isRegistered = async (word: string) => {
  console.log("checking " + word.toLowerCase());
  // https://api.dnsbelgium.be/whois/registration/abc/status
  // let url = "https://api.dnsbelgium.be/whois/registration/" + word.toLowerCase() + "/status"

  let domainName = word.toLowerCase();
  let delegated = await isDelegated(domainName);
  if (delegated) {
    return true;
  }

  let url = "https://api.dnsbelgium.be/pubws/das?domain=" + domainName

  console.log("checking with url: " + url);

  // noinspection UnnecessaryLocalVariableJS
  let registered = fetch(url)
    .then(value => value.json())
    .then(value => value.data.dasResults.be.status)
    .then(value => {
      let domainStatus = value.toString()
      console.log("domain status : [" + value.toString() + "]")
      if (domainStatus === "DELEGATED") {
        console.log("domain [" + word + "] is registered")
        return true;
      } else {
        console.log("domain [" + word + "] is NOT registered")
        return false;
      }
    });
  //console.log("registered: " + registered)
  return registered;

}

export const isDelegated = async (word: string) => {
  const domainName = word.toLowerCase() + ".be";
  let url = 'https://dns.google/resolve?name=' + domainName;
  var response = await fetch(url);
  var json = await response.json();
  console.log(json);
  return json.Status === 0;
}

export const isDnssecSigned = async (word: string) => {
  const domainName = word.toLowerCase() + ".be";
  let url = 'https://dns.google/resolve?name=' + domainName  + "&type=DS"
  var response = await fetch(url);
  var json = await response.json();
  console.log(json);
  const signed = json.Status === 0 && json.AD === true;
  console.log("DNSSEC signed: " + signed);
  return signed;
}


export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(guess)

  for (let i = 0; i < guess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(guess[i])
    }
    if (statuses[i] === 'correct' && word[i] !== guess[i]) {
      return WRONG_SPOT_MESSAGE(guess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of word) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now() + 86400000
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs
  // console.log('getWordOfDay WORDS.length=' + WORDS.length)
  // console.log('getWordOfDay now=' + now)
  // console.log('getWordOfDay index=' + index)
  // console.log('getWordOfDay nextday=' + nextday)
  // const solution = WORDS[index % WORDS.length].toUpperCase();
  // console.log('solution index=' + solution)

  return {
    solution: WORDS[index % WORDS.length].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
