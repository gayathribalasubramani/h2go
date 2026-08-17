# h2go

The hub page my NFC-tapped water bottle opens: a tap counter that only
counts real taps on the bottle, and a tic-tac-toe game against an
unbeatable computer.

Wifi sharing is on hold — the bottle's primary network is my home wifi,
and I didn't want that password published in a public repo.

## How it's wired up

The bottle (an Ocean Bottle) has a built-in NFC chip at its base, but
only a small slice of it is actually writable — long URLs get corrupted
partway through. So the chip holds a short redirect link (`da.gd`/`ulvis.net`) pointing at
`https://gayathribalasubramani.github.io/h2go/?src=nfc`. The `?src=nfc`
marker is how the page tells a real tap apart from someone opening the
link directly — only taps increment the counter.

## Deploy

Served via GitHub Pages from `main` / `root`, live at
`https://gayathribalasubramani.github.io/h2go/`.
