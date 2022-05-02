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
    "rank": 1,
    "name": "巨人",
    "play_game_count": 32,
    "win": 20,
    "lose": 12,
    "draw": 0,
    "pct": 0.625,
    "games_behind": "-",
    "remaining_games": 111,
    "run": 137,
    "ra": 119,
    "hr": 36,
    "sb": 12,
    "avg": 0.249,
    "era": 3.26,
    "pythagen_pat": 0.564
  },
  {
    "rank": 2,
    "name": "ヤクルト",
    "play_game_count": 27,
    "win": 15,
    "lose": 12,
    "draw": 0,
    "pct": 0.556,
    "games_behind": "2.5",
    "remaining_games": 116,
    "run": 101,
    "ra": 105,
    "hr": 26,
    "sb": 13,
    "avg": 0.229,
    "era": 3.31,
    "pythagen_pat": 0.483
  },
  .
  .
  .
]
```

## Author
[@ant2357](https://twitter.com/ant2357)