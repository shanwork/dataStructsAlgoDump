This concept is used in US roads - the sequence, or logic followed when two lanes merge into one. 
The norm is that cars from each of the two (source) lanes merge alternately into the (destination) lane, much like the closing of a zipper 
This concept can be extended to multiple queues being managed to merge into one - actually traffic regulation at carpool lights is a good example
Data structurally this uses 1 main queue + multiple subqueues. Index to indicate the next item to be dequeued (which subQueue) and other stuff
Also a third type of collection - concept - of a bulk queue which feeds the subqueues
Data Structure Simulation:
1. Population
2. Processing
3. Modifications and Learning concepts  

1. Population
Parameters defined are
a. size of the main queue (m)
b. size of each subqueue (s)
c. number of subqueues (n)
d. Optional size of bulk queue (qB)
a, b and c above define what could be termed the 'controllable' section of the Structure
potential max capacity here is m + n * s; spillover will be taken by the bulk.

order of Population
- first m elements can occupy - be pushed to - the main queue
- subsequent multiples of s elements will occupy the subqueues
- anything above this will be pushed to the bulk queue portion


2. Processing 
