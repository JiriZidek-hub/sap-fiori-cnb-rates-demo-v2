# Kurzy ČNB – UI5/Fiori demo

Tento projekt je univerzální základ pro Fiori/UI5 aplikaci, která načítá aktuální kurzovní lístek ČNB a přepočítává částku v CZK na cizí měny.

## Co obsahuje
- UI5 aplikace v SAPUI5 / OpenUI5
- načítání XML dat z ČNB
- přepočet částky v CZK
- tabulka s kódem, názvem měny, množstvím, kurzem a výsledkem

## Jak spustit

1. Nainstaluj závislosti:
   ```bash
   npm install
   ```

2. Spusť aplikaci:
   ```bash
   npm start
   ```

3. Otevři prohlížeč na adrese, kterou vám CLI vypíše (obvykle http://localhost:8080)

## Zdroj dat

Oficiální kurzovní lístek ČNB:
```text
https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/denni_kurz.xml
```

## Rozšíření pro pozdější použití

Tento projekt je připravený jako základ pro další rozšíření:
- filtr měn (EUR, USD, GBP, CHF)
- správce druhů měn
- graf historie kurzů
- Fiori Elements / List Report
- propojení s backend službou

## Poznámka

Aplikace načítá data přímo z externího zdroje ČNB, takže je vhodná pro demo i pro další rozvoj.
