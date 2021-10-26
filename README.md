NpbResult (NPB Web API)
===

プロ野球の順位表情報をJSON形式で返します。

## Usage

#### Request
`GET https://npb-result.herokuapp.com/cl`  
or  
`GET https://npb-result.herokuapp.com/pl`  
or  
`GET https://npb-result.herokuapp.com/cp`  
or  
`GET https://npb-result.herokuapp.com/op`  

#### Response
```
[
  {
    "id": 1,
    "rank": 1,
    "name": "阪神",
    "play_game_count": 112,
    "win": 61,
    "lose": 46,
    "draw": 5,
    "pct": 0.57,
    "games_behind": "-",
    "remaining_games": 31,
    "run": 451,
    "ra": 434,
    "hr": 105,
    "sb": 95,
    "avg": 0.252,
    "era": 3.58,
    "pythagorean_expectation": 0.519
  },
  {
    "id": 2,
    "rank": 2,
    "name": "ヤクルト",
    "play_game_count": 107,
    "win": 52,
    "lose": 42,
    "draw": 13,
    "pct": 0.553,
    "games_behind": "2.5",
    "remaining_games": 36,
    "run": 472,
    "ra": 411,
    "hr": 106,
    "sb": 65,
    "avg": 0.256,
    "era": 3.61,
    "pythagorean_expectation": 0.569
  },
  .
  .
  .
]
```

## Author
[@ant2357](https://twitter.com/ant2357)