package favorites

import "context"

type Repository interface {
	Toggle(context.Context, string, string) (bool, error)
}
