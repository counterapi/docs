# Quick Start with CLI

Count API CLI is a standalone tool which enables you to count up/down, get counter information or list history of the
counter.

<br/>
It does not require authentication or login.

```shell
CLI command to counter things

Usage:
  counter [command]

Available Commands:
  counts      Fetches counts of counter
  down        Count down for given name
  get         Fetches counter information
  help        Help about any command
  set         Sets counter
  up          Count up for given name
  version     Print the version/build number

Flags:
  -h, --help   help for counter

Use "counter [command] --help" for more information about a command.
```

## Count Up

You can count up with given name. The name of the counter is unique. Do not forget that anyone with same name can count
up or down.

```shell
❯ counter up --name MyCounter01                  
{
        "id": 12,
        "name": "MyCounter01",
        "count": 1,
        "created_at": "2021-03-28T21:19:09.450461117Z",
        "updated_at": "2021-03-28T21:19:09.466029457Z"
}
```

## Count Down

```shell
❯ counter down --name MyCounter01
{
    "id": 12,
    "name": "MyCounter01",
    "count": 0,
    "created_at": "2021-03-28T21:19:09.450461117Z",
    "updated_at": "2021-03-28T21:19:09.466029457Z"
}
```

## Set Count

You can set your counter to with `set` function.

```shell
❯ counter set --name MyCounter01 --count 10
{
    "id": 12,
    "name": "MyCounter01",
    "count": 10,
    "created_at": "2021-03-28T21:19:09.450461117Z",
    "updated_at": "2021-03-28T21:19:09.466029457Z"
}
```

## Get Counter

After counting up/down, you can get the final status of your counter with `get` function.

```shell
❯ counter get --name MyCounter01
{
    "id": 12,
    "name": "MyCounter01",
    "count": 0,
    "created_at": "2021-03-28T21:19:09.450461117Z",
    "updated_at": "2021-03-28T21:19:09.466029457Z"
}
```
