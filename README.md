Gaming Hub

## Descrizione

Piattaforma che mostra videogiochi, e da la possibilitá ai suoi utenti autenticati di comunicare tra loro tramite chat in tempo reale, scegliere i giochi preferiti e lasciare reviews su quelli che hanno giocato.

## API

* https://rawg.io/apidocs
l'API Web scelta:
   * [x] Supporta CORS
   * [x] Richiede una chiave API
   * [x] Supabase

## Styling Solution o Component Library

* CSS3
* Tailwind CSS: https://tailwindcss.com/
* Daisy UI: https://daisyui.com/

## Pages

1. Homepage - Lista dei giochi disponibili e ricerca tra i giochi
2. Genres Page - Lista dei giochi secondo il filtro specifico Generi
3. Platforms Page - Lista dei giochi secodno il filtro specifico Piattaforme
4. Details - Mostra dettagli sullo specifico gioco, se autenticato l'utente puó selezionarlo tra i preferiti e puo lasciare un commento sul gioco.
5. Login Page - Possibilitá di autenticazione ( email, OAuth ( discord, facebook ) )
6. Register Page - Possibilitá di registrare Utente con Email
7. Account Page - Dettaglio profilo Utente, Mostra avatar utente autenticato, lista dei giochi preferiti e lista delle review pubblicate
8. Settings Page - Aggiornamento profilo Utente

##  API + User Interaction

-    Utenti possono cercare un gioco con un campo ricerca
-    Utenti possono cliccare su un gioco per vederne il dettaglio e eventuali reviews
-    Utenti possono filtrare su un gioco basandosi su un parametro
-    Utenti loggati possono caricare informazioni profilo ( nome, cognome, avatar, username, ecc... )
-    Utenti loggati possono lasciare una review su un gioco specifico
-    Utenti loggati possono rimuovere una review su un gioco specifico
-    Utenti loggati possono creare una lista di giochi preferiti
-    Utenti loggati possono rimuovere un gioco dai preferiti
-    Utenti loggati possono chattare live su un gioco specifico

## Context API

- Utenti loggati possono condividere dati all'interno dell'applicazione.

## Deployment

* https://gaming-hub-roccotaccognas-projects.vercel.app/