// Node.js의 require를 사용해 임포트
const bodyParser = require('body-parser')

// 'Express' 애플리케이션 인스턴스를 받는 함수를 익스포트
module.exports = app => {
  // HTTP 요청의 body 내용을 JSON으로 파싱하는 미들웨어를 설치
  app.use(bodyParser.json())

  // 사용자 정보
  const users = {
    'foo@domain.com': {
      password: '12345678',
      userId: 1,
      token: '1234567890abcdef'
    }
  }

  // 태스크 목록 ID
  let nextTaskListId = 1
  // 태스크 ID
  let nextTaskId = 1

  // 태스크 목록 ID를 생성하는 헬퍼 함수
  const generateTaskListId = () => nextTaskListId++

  // 태스크 ID를 생성하는 헬퍼 함수
  const generateTaskId = () => nextTaskId++

  // 태스크를 생성하는 헬퍼 함수
  const createTask = listId => ({
    id: generateTaskId(),
    name: `태스크 ${nextTaskId - 1}`,
    description: `이것은 태스크 ${nextTaskId - 1}입니다.`,
    listId
  })

  // 태스크 목록을 생성하는 헬퍼 함수
  const createTaskList = (name, num) => {
    const id = generateTaskListId()
    const list = { id, name, items: [] }
    for (let i = 0; i < num; i++) {
      list.items.push(createTask(id))
    }
    return list
  }

  // 보드 정보
  const board = {
    lists: [
      createTaskList('TODO', 2),
      createTaskList('WIP', 1),
      createTaskList('DONE', 1)
    ]
  }

  // 로그인 API 엔드포인트 '/auth/login'
  app.post('/auth/login', (req, res) => {
    const { email, password } = req.body
    const user = users[email]
    if (user) {
      if (user.password !== password) {
        res.status(401).json({ message: '로그인에 실패했습니다' })
      } else {
        res.json({ userId: user.userId, token: user.token })
      }
    } else {
      res.status(404).json({ message: '등록된 사용자가 아닙니다' })
    }
  })


  // 보드 태스크 목록 API 엔드포인트 '/lists'
  app.get('/lists', (req, res) => {
    const token = req.headers['x-kbn-token']
    if (!token) {
      return res.status(403).json({ message: '허가되지 않았습니다' })
    }
    res.json({ lists: board.lists })
  })


  // 태스크를 추가하는 헬퍼 함수
  function addTask (board, name, listId) {
    let task = null
    for (let i = 0; i < board.lists.length; i++) {
      const list = board.lists[i]
      if (list.id === listId) {
        task = {
          id: generateTaskId(),
          name,
          description: '',
          listId
        }
        list.items.push(task)
        break
      }
    }
    return task
  }

  // タスク 추가 API 엔드포인트 '/tasks/add'
  app.post('/tasks/add', (req, res) => {
    const token = req.headers['x-kbn-token']
    if (!token) {
      return res.status(403).json({ message: '허가되지 않았습니다' })
    }
    const { name } = req.body
    const listId = parseInt(req.body.listId)
    const task = addTask(board, name, listId)
    if (task) {
      res.status(201).json(task)
    } else {
      res.status(500).json({ message: '알 수 없는 원인으로 태스크 추가에 실패했습니다' })
    }
  })


  // 태스크를 수정하는 헬퍼 함수
  function updateTask (board, id, name, description, listId) {
    let ret = false
    for (let i = 0; i < board.lists.length; i++) {
      const list = board.lists[i]
      if (list.id !== listId) { continue }
      for (let j = 0; j < list.items.length; j++) {
        const item = list.items[j]
        if (item.id === id) {
          item.name = name
          item.description = description
          ret = true
          break
        }
      }
    }
    return ret
  }

  // 태스크 수정 API 엔드포인트 '/tasks/:id/update'
  app.put('/tasks/:id/update', (req, res) => {
    const token = req.headers['x-kbn-token']
    if (!token) {
      return res.status(403).json({ message: '허가되지 않았습니다' })
    }
    const { name, description } = req.body
    const id = parseInt(req.params.id)
    const listId = parseInt(req.body.listId)
    const ret = updateTask(board, id, name, description, listId)
    if (ret) {
      res.sendStatus(200)
    } else {
      res.status(500).json({ message: '알 수 없는 원인으로 태스크 수정에 실패했습니다' })
    }
  })


  // 태스크 삭제 헬퍼 함수
  function removeTask (board, id) {
    board.lists.forEach(list => {
      list.items = list.items.filter(item => item.id !== id)
    })
  }

  // 태스크 삭제 API 엔드포인트 '/task/:id/remove'
  app.delete('/tasks/:id/remove', (req, res) => {
    const token = req.headers['x-kbn-token']
    if (!token) {
      return res.status(403).json({ message: '허가되지 않았습니다' })
    }
    const id = parseInt(req.params.id)
    removeTask(board, id)
    res.sendStatus(204)
  })

  // 태스크 이동 API 엔드포인트 '/task/:id/move'
  app.post('/tasks/:id/move', (req, res) => {
    const token = req.headers['x-kbn-token']
    if (!token) {
      return res.status(403).json({ message: '허가되지 않았습니다' })
    }

    const target = parseInt(req.params.id)
    const from = parseInt(req.body.from)
    const to = parseInt(req.body.to)

    const fromTaskList = getTaskList(board, from)
    const index = fromTaskList.items.findIndex(item => item.id === target)
    const task = fromTaskList.items[index]
    fromTaskList.items.splice(index, 1)

    task.listId = to

    const toTaskList = getTaskList(board, to)
    toTaskList.items.push(task)

    res.sendStatus(200)
  })

  function getTaskList (board, id) {
    return board.lists.find(list => list.id === id)
  }

  // 로그아웃 API 엔드포인트 '/auth/logout'
  app.delete('/auth/logout', (req, res) => {
    const token = req.headers['x-kbn-token']
    if (!token) {
      return res.status(403).json({ message: '허가되지 않았습니다' })
    }
    // NOTE: 목업이므로 토큰 검증 등은 구현되지 않았음
    res.sendStatus(204)
  })
}
