import { Subject, BehaviorSubject } from 'rxjs';
const _getTodolistInfo$  = new BehaviorSubject([]);
const webLink = 'http://localhost:3000/todos';
const appListenService = ()=>{
  fetch(webLink).then((items)=>{
    return items.json();
  }).then((items)=>{
    _getTodolistInfo$.next(items)
  })
};
const updateProgress = (item)=>{
  const id = item._id;
  const patchWeblink = `${webLink}/${id}`;
  console.log(patchWeblink, 'patchWeblink')
  fetch(patchWeblink,{
    method:'PATCH',
    body:JSON.stringify(item)
  }).then((res) => res.json).then(() => appListenService())
}

export const serviceListen = {
  appListenService,
  updateProgress,
  getTodolistInfo$:_getTodolistInfo$.asObservable(),
};
