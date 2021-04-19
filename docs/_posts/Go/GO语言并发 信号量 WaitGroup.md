## WaitGroup使用

```go
//新建WaitGroup变量
var wg sync.WaitGroup  

wg.Add(1)  
go func() {  
     defer wg.Done()  
     //任务1...
 
}()  

wg.Add(1)  
go func() {  
     defer wg.Done()  
     //任务2...
  
}()  

//等待wg归0
wg.Wait()
```