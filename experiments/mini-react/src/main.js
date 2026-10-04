// 제공된 단계 0: DOM을 직접 갱신하는 출발점. mini-react 정답 구현은 아닙니다.
const products = [
  { id: "keyboard", name: "기계식 키보드", price: 89000, inStock: true },
  { id: "mouse", name: "무선 마우스", price: 35000, inStock: true },
  { id: "hub", name: "USB 허브", price: 42000, inStock: true },
  { id: "compact", name: "미니 키보드", price: 65000, inStock: false },
  { id: "stand", name: "노트북 거치대", price: 28000, inStock: false },
];
const notes = new Map();
const queryInput = document.querySelector("#query");
const stockInput = document.querySelector("#stock");
const sortInput = document.querySelector("#sort");
const results = document.querySelector("#results");
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");

function updateResults() {
  const query = queryInput.value.trim().toLowerCase();
  const visible = products.filter(product =>
    product.name.toLowerCase().includes(query) &&
    (!stockInput.checked || product.inStock)
  );
  if (sortInput.value === "asc") visible.sort((a, b) => a.price - b.price);
  if (sortInput.value === "desc") visible.sort((a, b) => b.price - a.price);

  // 학습용 단순화: 목록 DOM을 매번 교체합니다. 단계 4에서 재사용과 비교하세요.
  results.replaceChildren();
  for (const product of visible) {
    const row = document.createElement("li");
    row.dataset.id = product.id;
    const title = document.createElement("h3");
    title.textContent = product.name;
    const detail = document.createElement("p");
    detail.textContent = `${product.price.toLocaleString("ko-KR")}원 · ${product.inStock ? "재고 있음" : "품절"}`;
    const label = document.createElement("label");
    label.textContent = `${product.name} 메모`;
    const input = document.createElement("input");
    input.type = "text";
    input.value = notes.get(product.id) ?? "";
    input.addEventListener("input", () => notes.set(product.id, input.value));
    label.append(input);
    row.append(title, detail, label);
    results.append(row);
  }
  count.textContent = `${visible.length}개 상품`;
  empty.hidden = visible.length !== 0;
}

queryInput.addEventListener("input", updateResults);
stockInput.addEventListener("change", updateResults);
sortInput.addEventListener("change", updateResults);
updateResults();
