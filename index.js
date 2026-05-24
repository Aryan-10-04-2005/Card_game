let deckId
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const winnerText = document.getElementById("winner")
const remainingCardsText = document.getElementById("remaining-cards")

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
    const winner = getHigherCard(card1, card2)

    if (winner === card1) {
        winnerText.textContent = "Computer wins!"
    } else if (winner === card2) {
        winnerText.textContent = "You win!"
    } else {
        winnerText.textContent = "War!"
    }
}

function updateRemainingCards(count) {
    remainingCardsText.textContent = `Cards remaining: ${count}`
}

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            updateRemainingCards(data.remaining)
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
        })
})
