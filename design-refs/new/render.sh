#!/bin/zsh
# Рендер всех фреймов нового дизайн-файла в PNG, порциями с бэкоффом на 429
TOKEN=$(cat /Users/aleksandr/Desktop/mark/figma_token | tr -d '[:space:]')
FILE=g9HEmyvuOYQyWJYlnPsMuA
OUT=/Users/aleksandr/Desktop/mark/design-refs/new
cd "$OUT" || exit 1

# id:имя_файла
FRAMES=(
  "1:3193:landing-1440"
  "1:3276:landing-768"
  "1:3374:landing-375"
  "1:3472:case-energo-1440"
  "1:3719:case-energo-768"
  "1:3802:case-energo-375"
  "1:3554:carousel-1440"
  "1:3568:service-mobile-1440"
  "1:3885:service-mobile-768"
  "1:3977:service-mobile-375"
  "1:3660:company-1440"
  "1:4069:company-768"
  "1:4128:company-375"
  "1:4187:cases-1440"
  "1:4210:cases-768"
  "1:4233:cases-375"
  "1:4256:modal-1440"
  "1:4275:modal-768"
  "1:4294:modal-375"
  "1:4314:menu-mobile-collapsed"
  "1:4316:menu-mobile-expanded"
  "1:4318:dropdown-1440"
  "1:4336:dropdown-768"
  "1:4356:policy-1440"
  "1:4395:policy-768"
  "1:4434:policy-375"
  "1:4473:notfound-1440"
  "1:4485:notfound-768"
  "1:4497:notfound-375"
)

BATCH=5
i=0
ids=()
names=()
flush() {
  [ ${#ids[@]} -eq 0 ] && return 0
  local idstr=$(IFS=,; echo "${ids[*]}")
  local attempt=0
  while [ $attempt -lt 8 ]; do
    RESP=$(curl -sS -m 120 -H "X-Figma-Token: $TOKEN" "https://api.figma.com/v1/images/$FILE?ids=$idstr&format=png&scale=1")
    if echo "$RESP" | grep -q '"status":429'; then
      attempt=$((attempt+1)); echo "429, wait 60s (attempt $attempt)"; sleep 60; continue
    fi
    echo "$RESP" > "batch_resp.json"
    for j in {1..${#ids[@]}}; do
      id=${ids[$j]}; name=${names[$j]}
      url=$(python3 -c "
import json,sys
d=json.load(open('batch_resp.json'))
print(d.get('images',{}).get('$id') or '')
")
      if [ -n "$url" ]; then
        curl -sS -m 300 "$url" -o "$name.png" && echo "OK $name"
      else
        echo "FAIL $name (no url): $(head -c 200 batch_resp.json)"
      fi
    done
    ids=(); names=()
    return 0
  done
  echo "GIVEUP batch $idstr"
  ids=(); names=()
}

for item in "${FRAMES[@]}"; do
  id="${item%:*}"; name="${item##*:}"
  ids+=("$id"); names+=("$name")
  i=$((i+1))
  if [ ${#ids[@]} -ge $BATCH ]; then
    flush
    sleep 20
  fi
done
flush
echo DONE
ls -la *.png | wc -l
