let deckId
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const winnerText = document.getElementById("winner")
const remainingCardsText = document.getElementById("remaining-cards")
const computerScoreText = document.getElementById("computer-score")
const playerScoreText = document.getElementById("player-score")

let scores = {
    computer: 0,
    player: 0
}

const cardValueOrder = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE"
]

function getHigherCard(card1, card2) {
    const score1 = cardValueOrder.indexOf(card1.value)
    const score2 = cardValueOrder.indexOf(card2.value)

    if (score1 > score2) {
        return card1
    }

    if (score2 > score1) {
        return card2
    }

    return null
}

function displayRoundWinner(card1, card2) {
    const result = determineCardWinner(card1, card2)

    if (result === 'computer') {
        winnerText.textContent = "Computer wins!"
    } else if (result === 'player') {
        winnerText.textContent = "You win!"
    } else {
        winnerText.textContent = "War!"
    }
}

function updateScoreDisplays() {
    computerScoreText.textContent = `Computer: ${scores.computer}`
    playerScoreText.textContent = `You: ${scores.player}`
}

function determineCardWinner(card1, card2) {
    const score1 = cardValueOrder.indexOf(card1.value)
    const score2 = cardValueOrder.indexOf(card2.value)

    if (score1 > score2) {
        scores.computer += 1
        updateScoreDisplays()
        return 'computer'
    }

    if (score2 > score1) {
        scores.player += 1
        updateScoreDisplays()
        return 'player'
    }

    return 'war'
}

function updateRemainingCards(count) {
    remainingCardsText.textContent = `Cards remaining: ${count}`
}

function updateDrawButtonState(remaining) {
    drawCardBtn.disabled = remaining === 0
}

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            updateRemainingCards(data.remaining)
            updateDrawButtonState(data.remaining)
        })
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            displayRoundWinner(data.cards[0], data.cards[1])
            updateRemainingCards(data.remaining)
            updateDrawButtonState(data.remaining)
        })
})

// initialize score display
updateScoreDisplays()
