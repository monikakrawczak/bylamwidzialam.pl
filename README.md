# BYŁAM WIDZIAŁAM – blog teatralny

Statyczna wersja bloga https://bylamwidzialam.pl zbudowana w [Astro](https://astro.build).

## Uruchomienie

```sh
npm install      # pierwszy raz
npm run dev      # podgląd na żywo: http://localhost:4321
npm run build    # gotowa strona w katalogu dist/
npm run preview  # podgląd zbudowanej strony
```

## Gdzie co jest

- `src/content/posts/` – wpisy (Markdown). Nowy wpis = nowy plik `.md`, np. skopiuj istniejący i zmień nagłówek.
  Pole `url` wyznacza adres wpisu (np. `https://bylamwidzialam.pl/2026/10/18/tytul/`).
- `src/assets/uploads/` – zdjęcia (strona sama je zmniejsza i konwertuje do WebP).
- `src/pages/kontakt.astro` – strona kontaktowa.
- `src/lib/posts.ts` – nazwa bloga, menu, pomocnicze funkcje.
- `src/styles/global.css` – wygląd.
- `raw/` – oryginalny eksport z WordPress.com (kopia zapasowa).

Adresy wpisów, kategorii (`/category/...`) i tagów (`/tag/...`) są takie same jak na WordPressie.

## Publikacja

Strona publikuje się sama na GitHub Pages po każdym `git push` na gałąź `main`
(automat w `.github/workflows/deploy.yml`). Postęp widać w zakładce **Actions** repozytorium.
