var seen = new HashSet<string>();
Console.WriteLine(seen.Add("ali"));
Console.WriteLine(seen.Add("ali"));  // again
Console.WriteLine(seen.Count);

var queue = new Queue<string>();
queue.Enqueue("Ali");
queue.Enqueue("Veli");
Console.WriteLine(queue.Dequeue());  // first in

var stack = new Stack<string>();
stack.Push("Ali");
stack.Push("Veli");
Console.WriteLine(stack.Pop());      // last in
