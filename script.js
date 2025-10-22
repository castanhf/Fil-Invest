const assetSearchInput = document.getElementById('asset-search');
const datalist = document.getElementById('asset-options');
const form = document.getElementById('strategy-form');
const errorMessage = document.getElementById('form-error');
const resultsSection = document.getElementById('results');
const inputSummary = document.getElementById('input-summary');
const strategyTableBody = document.getElementById('strategy-table');

const ASSET_DATA_PATHS = ['data/cryptocurrencies.json', 'data/sp500.json'];
const assetIndex = new Map();

async function loadAssets() {
  try {
    const datasets = await Promise.all(
      ASSET_DATA_PATHS.map((path) => fetch(path).then((response) => response.json()))
    );

    const combined = datasets.flat();
    combined.sort((a, b) => a.name.localeCompare(b.name));

    const fragment = document.createDocumentFragment();
    combined.forEach((asset) => {
      const option = document.createElement('option');
      const label = `${asset.name} (${asset.symbol.toUpperCase()})`;
      option.value = label;
      fragment.appendChild(option);

      assetIndex.set(label.toLowerCase(), asset);
      assetIndex.set(asset.symbol.toLowerCase(), asset);
      assetIndex.set(asset.name.toLowerCase(), asset);
    });

    datalist.appendChild(fragment);
  } catch (error) {
    console.error('Unable to load asset list', error);
  }
}

function parseAsset(input) {
  if (!input) {
    return null;
  }

  const normalized = input.trim().toLowerCase();
  return assetIndex.get(normalized) || null;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

function formatHoldings(value) {
  return Number(value).toLocaleString('en-US', {
    maximumFractionDigits: 6,
  });
}

function buildSummary({ selectedAssetLabel, investmentAmount, averagePrice, initialHoldings }) {
  inputSummary.innerHTML = '';

  const items = [
    {
      label: 'Selected asset',
      value: selectedAssetLabel,
    },
    {
      label: 'Investment amount',
      value: formatCurrency(investmentAmount),
    },
    {
      label: 'Average buy price',
      value: formatCurrency(averagePrice),
    },
    {
      label: 'Initial holdings',
      value: `${formatHoldings(initialHoldings)} units`,
    },
  ];

  items.forEach(({ label, value }) => {
    const row = document.createElement('div');
    row.className = 'summary-item';

    const labelElement = document.createElement('span');
    labelElement.className = 'summary-label';
    labelElement.textContent = label;

    const valueElement = document.createElement('span');
    valueElement.className = 'summary-value';
    valueElement.textContent = value;

    row.append(labelElement, valueElement);
    inputSummary.appendChild(row);
  });
}

function generateStrategy({ averagePrice, initialHoldings }) {
  const ITERATIONS = 10;
  const strategyRows = [];
  let remainingHoldings = initialHoldings;
  let previousPrice = averagePrice;

  for (let iteration = 0; iteration <= ITERATIONS; iteration += 1) {
    const price = iteration === 0 ? averagePrice : previousPrice * 1.5;
    const holdingsBeforeSale = remainingHoldings;
    const soldQuantity = iteration === 0 ? 0 : holdingsBeforeSale * 0.1;
    const profitTaken = soldQuantity * (price - averagePrice);
    remainingHoldings = holdingsBeforeSale - soldQuantity;
    previousPrice = price;

    strategyRows.push({
      iteration,
      price,
      holdingsBeforeSale,
      soldQuantity,
      profitTaken,
      holdingsAfterSale: remainingHoldings,
    });
  }

  return strategyRows;
}

function renderStrategyTable(rows) {
  strategyTableBody.innerHTML = '';

  rows.forEach((row) => {
    const tr = document.createElement('tr');

    const cells = [
      row.iteration,
      formatCurrency(row.price),
      `${formatHoldings(row.holdingsBeforeSale)}`,
      `${formatHoldings(row.soldQuantity)}`,
      formatCurrency(row.profitTaken),
      `${formatHoldings(row.holdingsAfterSale)}`,
    ];

    cells.forEach((cellValue) => {
      const td = document.createElement('td');
      td.textContent = cellValue;
      tr.appendChild(td);
    });

    strategyTableBody.appendChild(tr);
  });
}

function resetError() {
  errorMessage.hidden = true;
  errorMessage.textContent = '';
}

function showError(message) {
  errorMessage.hidden = false;
  errorMessage.textContent = message;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  resetError();

  const assetInputValue = assetSearchInput.value.trim();
  const investmentAmount = Number(form.investment.value);
  const averagePrice = Number(form.averagePrice.value);

  if (!assetInputValue) {
    showError('Please choose a cryptocurrency or S&P 500 company.');
    return;
  }

  if (!Number.isFinite(investmentAmount) || investmentAmount <= 0) {
    showError('Investment amount must be a positive number.');
    return;
  }

  if (!Number.isFinite(averagePrice) || averagePrice <= 0) {
    showError('Average buy price must be a positive number.');
    return;
  }

  const selectedAsset = parseAsset(assetInputValue);
  const selectedAssetLabel = selectedAsset
    ? `${selectedAsset.name} (${selectedAsset.symbol.toUpperCase()})`
    : assetInputValue;

  const initialHoldings = investmentAmount / averagePrice;
  buildSummary({ selectedAssetLabel, investmentAmount, averagePrice, initialHoldings });

  const strategyRows = generateStrategy({ averagePrice, initialHoldings });
  renderStrategyTable(strategyRows);

  resultsSection.hidden = false;
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

loadAssets();
