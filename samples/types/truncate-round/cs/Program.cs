double d = 9.99;
Console.WriteLine((int)d);      // truncates
Console.WriteLine((int)-d);

// Banker's rounding: .5 goes to the even number
Console.WriteLine(Math.Round(2.5));
Console.WriteLine(Math.Round(3.5));
Console.WriteLine(Math.Round(2.5,
    MidpointRounding.AwayFromZero));
