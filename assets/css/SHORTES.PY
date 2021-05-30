
import random

NODES = 7 

INVALID = 0.001  
  
  
distance_links = [[INVALID for i in range(NODES)]
                           for j in range(NODES)]
# distance of each link                           
distance_links[0][1] = 7
distance_links[1][0] = 7
distance_links[1][2] = 8
distance_links[2][1] = 8
distance_links[0][2] = 9
distance_links[2][0] = 9
distance_links[3][0] = 9
distance_links[0][3] = 9
distance_links[4][3] = 4
distance_links[3][4] = 4
distance_links[5][4] = 6
distance_links[4][5] = 6
distance_links[5][2] = 4
distance_links[2][5] = 4
distance_links[4][6] = 8
distance_links[6][4] = 8
distance_links[0][6] = 5
distance_links[6][0] = 5
  
  
  
# Finds next node from current node
def next_node(s): 
    nxt = []
      
    for i in range(NODES):
        if(distance_links[s][i] != INVALID):
            nxt.append(i)
    return nxt
  
# Find simple paths for each
def find_simple_paths(start, end):
    visited = set()
    visited.add(start)
  
    nodestack = list()
    indexstack = list()
    current = start
    i = 0
  
    while True:
          
        # get a list of the neighbors
        # of the current node
        neighbors = next_node(current)
  
        # Find the next unvisited neighbor
        # of this node, if any
        while i < len(neighbors) and neighbors[i] in visited: 
            i += 1
  
        if i >= len(neighbors):
            visited.remove(current)
              
            if len(nodestack) < 1: 
                break
                  
            current = nodestack.pop()
            i = indexstack.pop()
              
        elif neighbors[i] == end:
            yield nodestack + [current, end]
            i += 1
              
        else:
            nodestack.append(current)
            indexstack.append(i + 1)
            visited.add(neighbors[i])
            current = neighbors[i]
            i = 0
  
# Find the shortest path
def solution(sour, dest):
  
    block = 0
    l = []
    for path in find_simple_paths(sour, dest): 
        l.append(path)     
  
    k = 0
    for i in range(len(l)):
        su = 0
        for j in range(1, len(l[i])):
            su += (distance_links[l[i][j-1]]
                                 [l[i][j]])
        k += su
          
    # print k 
    dist_prob = []
    probability = []
  
    for i in range(len(l)):
        s, su = 0, 0
      
        for j in range(1, len(l[i])):     
                  
            su += (distance_links[l[i][j-1]]
                                 [l[i][j]])
                                   
        dist_prob.append(su/(1.0 * k))
          
      
    for m in range(len(dist_prob)):
        z = (dist_prob[m])
        probability.append(z)
  
    for i in range(len(probability)):
        if(probability[i] == min(probability)):
  
            z = l[i]
            print("Shortest Path is", end = " ")
            print(z)
              
# Driver Code
if __name__ == '__main__' :
    source, dest = 1, 5
      
    # Calling the solution function
    solution(source, dest) 