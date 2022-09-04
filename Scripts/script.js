let url = 'http://localhost:3001/data'
const search = document.querySelector('.search')
const place = document.querySelector('.list')
const increase = document.querySelector('.increase-btn')
const employees = document.querySelector('.employees') 
let count = document.querySelector('.count')
const all = document.querySelector('.overAll')
let form = document.forms.addUser
const salary = document.querySelector('.big-salary')
axios.get(url)
  .then(res => {
    if(res.status === 200 || res.status === 201){
        let Arrdata = res.data 
        reload(res.data)
        search.onkeyup = () => {
            let filtered = Arrdata.filter(i => {
                let name = i.name.toLowerCase()
                let value = search.value.toLowerCase().trim()
        
                if(name.includes(value)){
                    return i
                }
            })
            reload(filtered)
        }
        
        
        let user = {}
        form.onsubmit = (e)  => {
            e.preventDefault()
            

            let fm = new FormData(form)

            fm.forEach((value, key)=> {
                user[key] = value
            })
            console.log(user);
            axios.post(url + '/', user)
             .then(res => {
             if(res.status === 200 || res.status === 201){
            // reload(res.data)
             console.log(res.data);
             }
     })
        }

        

        all.innerHTML = Arrdata.length


        increase.onclick = () => {
            increase.style.backgroundColor = 'white'
            employees.style.backgroundColor = 'transparent'
            increase.style.color = 'black'
            employees.style.color = 'white'
            salary.style.backgroundColor = 'transparent'
            salary.style.color = 'white'
            let filtered2 = Arrdata.filter(i => {
                if(i.increase === true){
                    return i
                }
            })
            reload(filtered2)
        }

        employees.onclick = () => {
            increase.style.backgroundColor = 'transparent'
            increase.style.color = 'white'
            employees.style.color = 'black'
            employees.style.backgroundColor = 'white'
            salary.style.backgroundColor = 'transparent'
            salary.style.color = 'white'
            reload(res.data)
        }

        salary.onclick = () => {
            increase.style.backgroundColor = 'transparent'
            increase.style.color = 'white'
            employees.style.backgroundColor = 'transparent'
            employees.style.color = 'white'
            salary.style.color = 'black'
            salary.style.backgroundColor = 'white'
            let filtered3 = Arrdata.filter(i => {
                if(i.salary > 1000){
                    return i
                }
            })
            reload(filtered3)
        }
  
        function reload(data) {
            place.innerHTML = ''
            for (const item of data) {
                let list = document.createElement('div')
                let left = document.createElement('div')
                let p = document.createElement('p')
                let right = document.createElement('div')
                let inp2 = document.createElement('input')
                let rightFar = document.createElement('div')
                let imgCookie = document.createElement('img')
                let imgDelete = document.createElement('img')
                let star = document.createElement('img')
                
                list.classList.add('list')
                left.classList.add('left')
                p.classList.add('font')
                right.classList.add('right')
                inp2.classList.add('inp2')
                rightFar.classList.add('right-far')
                imgCookie.classList.add('cookie')
                imgDelete.style.height = '30px'
                imgCookie.style.height = '30px'
                star.src = './img/1730975_star_celebration_christmas_holiday_shain_icon.svg'
                star.style.height = '30px'
                star.style.display = 'none'
          
                p.innerHTML = item.name
                inp2.value = item.salary
        
                imgCookie.src = './img/cookie_icon.svg'
                imgDelete.src = './img/delete_ic_icon.svg'
        
        
                left.append(p) 
                right.append(inp2, rightFar)
                rightFar.append(imgCookie, imgDelete, star) 
                list.append(left, right)
                place.append(list)
        
        
                p.onclick = () => {
                    star.style.display = 'inline'
                }

                if(item.increase === true){
                    star.style.display = 'inline'
                }
                
                inp2.onkeyup = () => {
                    axios.patch(url + '/' + item.id, {
                        salary: inp2.value
                    })
                }

                
                star.onclick = () => {
                    if(item.increase === true){
                        axios.patch(url + '/' + item.id, {
                            increase: false
                        }) 
                        document.location.reload()
                    } else{
                        axios.patch(url + '/' + item.id, {
                            increase: true
                        }) 
                        document.location.reload()
                    }
                }
                
                imgDelete.onclick = () => {
                    axios.delete(url + '/' + item.id)
                }
        
                
                // imgCookie.onclick = () => {
                //     if(p.classList.contains('toggle')){
                //         count = count.innerHTML++
                //         axios.patch(url + '/' + item.id, {
                //             rise: true
                //         })
                //     } else{
                //         p.classList.remove('toggle')
                //         inp2.classList.remove('toggle')
                //         count = count.innerHTML--
                //         axios.patch(url + '/' + item.id, {
                //             rise: false
                //         })
                //     }
                    
                // }

                // if(item.rise === false){
                //     count = count.innerHTML--
                //         p.classList.remove('toggle')
                //         inp2.classList.remove('toggle')
                // } else{
                //     p.classList.add('toggle')
                //         inp2.classList.add('toggle')
                //         count = count.innerHTML++
                // }

                if(item.rise == true){
                        count = count.innerHTML++
                        p.classList.add('toggle')
                        inp2.classList.add('toggle')
                }

                imgCookie.onclick = () => {
                    if(item.rise === true){
                        count = count.innerHTML--
                        p.classList.remove('toggle')
                        inp2.classList.remove('toggle')
                        axios.patch(url + '/' + item.id, {
                            rise: false
                        })
                        document.location.reload()
                        
                    } else if(item.rise === false){
                        p.classList.add('toggle')
                        inp2.classList.add('toggle')
                        count = count.innerHTML++
                        axios.patch(url + '/' + item.id, {
                            rise: true
                        })
                        document.location.reload()
                    }
                }
            }
        }
        


        


    }
  })
 
  
  

