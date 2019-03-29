
# Diverge

The medium is the message.

Diverge at any and every letter.

**This project is in the idea stage.**

It's nothing yet but [a filtered list (on a canvas with some fun transitions.)](https://1j01.github.io/diverge/)

<!--
type to choose a path (creating one if it doesn't exist)
could use italics/low opacity for text that doesn't exist yet
could use chromaticity for path disambiguation where paths join/diverge, or for authorship
there could actually be a useful tool somewhere in this idea space
perhaps in examining/making drafts, maybe not of books but of smaller amounts of text
-->

### Paths

<!--
Forge a path by typing
or browse only suggested paths
via mouse/pen/touch/whatever.
-->

You'll be able to
forge a path by typing,
or follow suggested paths
via mouse/pen/touch/whatever.

Currently you can only use the keyboard,
and to follow a suggested path,
you have to type it out.

<!--
You won't be able to forge an *arbitrary* path (character by character) without typing
because it won't give you the option of every character...
like Dasher does:
http://www.bltt.org/software/dasher/
-->

Similar paths that don't quite match could be lined up "magnetically"

Here's some crude ASCII-art to try to communicate the idea:

	The quick fox jumped at the opportunity
	The qui   fox jumps     the
	       c n         over     lazy dog
	      k   w
	       bro

<!--
There could be lines shown between
letters that are magnetically attracted
but are far apart due to the physics simulation.
-->

<!--
When the input is empty,
it could show possible paths,
or present a more pristine blank slate.
(The utter minimalism of a centered blinking cursor is appealing.)
Space could act as a toggle for this.
(You don't need to put spaces at the beginning of a path.)
(And if you really want to for some reason, you could copy and paste a space.)
If you're trying different letters to get the suggestions to pop up,
you might naturally try space
Enter could work too.
(You don't need to enter an empty path into the database.)
(And if you really want to for some reason, you can find a way.)
-->

### Providers

Providers can look at the path you're on and the cursor position and suggest alternative paths.

The basic provider returns paths from a database of strings entered by users.

A Markov text chain or sentence autocomplete provider would return paths with text inserted at the cursor,
whereas a paraphrasing provider (possibly using a neural network?) could return strings with infix replacements,
making for paths that diverge and rejoin the current path.

<!--
If a provider returns a path with changes not visible in the current viewport...
Well we definitely don't want to sneak in changes to the user's text without them knowing.
Users should also be able to select subsets of changes from a suggestion,
and providers should generally continue providing the other changes if one change is selected.
If they can't, this could be handled by the UI,
keeping a suggestion around as long as the user is heading towards it.
Actually yeah, that would be really good.
That way you could have a provider that returns the current text with the reverse added, for instance.
-->

### Evaluators

Do you value rhyme, alliteration, assonance?
Are fifthglyphs [vil<b>e</b> & <b>e</b>vil](https://www.reddit.com/r/AVoid5/),
or [good, top notch stuff](https://www.reddit.com/r/EmboldenTheE/)?
<!-- (Subverting demonstration of those phrases by reversing the demonstrations) -->

Arbitrary writing constraints and softer nudges
can be interesting instruments of creativity.

Evaluators can be combined and weighted.

### Communities

I don't know what would work best
for the granularity and structure,
but it could have communities
with independent moderation and rules,
similar to Reddit,
and pages with seed texts...
and then maybe special rules could be applied to certain pages,
possibly based on tags...
and maybe some tags could only be set by moderators and some could be set by anyone...

A simpler model could be that
there are just pages
with seed text and rules
set initially by a user.

Either way, there'd be links, of course.

<!--
The evaluators can be used to just weigh suggested paths,
or can they also be hard or soft rules on paths you can enter.
Soft rules as in guidelines, or where there's a non-zero tolerance level.
-->

<!--
Is seed text the way to go?
If discovery is based on the prefix of the seed text,
you might be discouraged from making a minor change........
or reinterpretation of something...........................
-->

<!--
When you hit enter it could add the current path to the database (associated with your user id),
and return to the initial state (i.e. empty or with seed text)
while transitioning that path to a list above,
which you could later remove or return to and branch from.
If you follow someone else's path, you could re-enter it,
and perhaps it would still just show up with their user identification,
but if deleted by them, it would persist under yours?
This might have a bad side effect if it were to encourage someone
to archive sensitive information accidentally pasted, or drunkenly divulged.
It could be a voting system
showing a count of how many users re-entered a path,
and it could even show a list of users that entered a path,
but it might be nicer without all that stuff.
I don't know.
Perhaps communities could toggle options:
whether "votes" (counts) are shown,
whether paths would be implicitly persisted by other users' re-entering.
Also, if paths are de-duped but weighted based on dupes,
and the database returned dupes,
it would naturally act as a basic voting system.
A crude one, in some situations.
If re-enterings are to work like votes,
you'd want to treat them as such
especially if you were to do something like /r/WritingPrompts.
Reddit has a contest mode.
You'd want things to be sorted at random initially.
Votes could have a probability function over time of whether they count,
that settles on always counting after some period of time.
-->

### Long-form writing

An alternate (maybe not exclusive) direction for this project to take
could be towards longer-form writing like articles and even books.
In that case it should work inline,
and it would be more focused on *editing*,
rather than exploration.
(Memetic exploration,
or [memex](https://en.wikipedia.org/wiki/Memex)ploration if you will.)

<!-- Sorta related, a different textploration idea: https://andymakes.itch.io/intimate-codex -->
